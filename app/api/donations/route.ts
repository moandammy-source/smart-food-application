import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

type Donation = {
  id: string;
  foodId: number;
  foodName: string;
  quantity: number;
  donationDate: string;
  pointsEarned: number;
  status: 'completed';
};

type DonationStore = {
  userId: string;
  totalPoints: number;
  donations: Donation[];
  orders?: OrderReward[];
};

type OrderReward = {
  orderId: string;
  pointsEarned: number;
  orderDate: string;
  status: 'completed';
};

type FoodRecord = {
  id: number;
  name: string;
  qty: number;
  price: number;
  donationScore: number;
};

const USER_ID = 'demo-user-nara';
const ELIGIBILITY_THRESHOLD = 68;
const storePath = path.join(process.cwd(), 'data', 'donations.json');
const foods: FoodRecord[] = [
  { id: 1, name: 'Roast Chicken Rice Box', qty: 6, price: 69, donationScore: 92 },
  { id: 2, name: 'Sourdough Loaf (day-old)', qty: 3, price: 45, donationScore: 68 },
  { id: 3, name: 'Iced Latte + Almond Croissant', qty: 4, price: 59, donationScore: 61 },
  { id: 4, name: 'Mixed Veg & Fruit Crate', qty: 10, price: 79, donationScore: 88 },
  { id: 5, name: 'Weekend Brunch Buffet Box', qty: 5, price: 129, donationScore: 72 },
  { id: 6, name: 'Protein Grain Bowl', qty: 7, price: 69, donationScore: 81 },
  { id: 7, name: 'Fresh Fruit & Veg Basket', qty: 8, price: 85, donationScore: 69 },
  { id: 8, name: 'Healthy Rice Bowl with Tofu', qty: 6, price: 75, donationScore: 70 },
  { id: 9, name: 'Chicken & Sweet Potato Pack', qty: 4, price: 92, donationScore: 67 },
];

let writeQueue = Promise.resolve();
let donationQueue = Promise.resolve();

async function readStore(): Promise<DonationStore> {
  try {
    const store = JSON.parse(await readFile(storePath, 'utf8')) as DonationStore;
    return { ...store, orders: store.orders || [] };
  } catch {
    return { userId: USER_ID, totalPoints: 320, donations: [], orders: [] };
  }
}

function saveStore(store: DonationStore) {
  writeQueue = writeQueue.then(async () => {
    await mkdir(path.dirname(storePath), { recursive: true });
    await writeFile(storePath, JSON.stringify(store, null, 2), 'utf8');
  });
  return writeQueue;
}

function responsePayload(store: DonationStore) {
  const donatedIds = new Set(store.donations.map((donation) => donation.foodId));
  return {
    totalPoints: store.totalPoints,
    donations: store.donations,
    eligibilityThreshold: ELIGIBILITY_THRESHOLD,
    foods: foods.map((food) => ({
      ...food,
      eligible: food.donationScore >= ELIGIBILITY_THRESHOLD && food.qty > 0 && !donatedIds.has(food.id),
      alreadyDonated: donatedIds.has(food.id),
    })),
  };
}

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(responsePayload(await readStore()));
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { action?: unknown; foodId?: unknown; orderId?: unknown } | null;

  if (body?.action === 'order') {
    const orderId = String(body.orderId || '');
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });
    }
    const operation = donationQueue.then(async () => {
      const store = await readStore();
      const orders = store.orders || [];
      const existingOrder = orders.find((order) => order.orderId === orderId);
      if (existingOrder) {
        return NextResponse.json({ message: `Order already rewarded. You earned ${existingOrder.pointsEarned} points.`, ...responsePayload(store), orderReward: existingOrder }, { status: 200 });
      }

      const orderReward: OrderReward = {
        orderId,
        pointsEarned: 10,
        orderDate: new Date().toISOString(),
        status: 'completed',
      };
      store.totalPoints += orderReward.pointsEarned;
      store.orders = [orderReward, ...orders];
      await saveStore(store);
      return NextResponse.json({ message: `Order confirmed! You earned ${orderReward.pointsEarned} points.`, ...responsePayload(store), orderReward }, { status: 201 });
    });
    donationQueue = operation.then(() => undefined, () => undefined);
    return operation;
  }

  const foodId = Number(body?.foodId);
  const food = foods.find((item) => item.id === foodId);

  if (!food) {
    return NextResponse.json({ error: 'Food item not found.' }, { status: 404 });
  }
  if (food.donationScore < ELIGIBILITY_THRESHOLD || food.qty <= 0) {
    return NextResponse.json({ error: 'This food has not reached the donation eligibility threshold.' }, { status: 422 });
  }

  const operation = donationQueue.then(async () => {
    const store = await readStore();
    if (store.donations.some((donation) => donation.foodId === food.id)) {
      return NextResponse.json({ error: 'This food item has already been donated.' }, { status: 409 });
    }

    const pointsEarned = Math.max(5, Math.round(food.price / 10));
    const donation: Donation = {
      id: `DON-${Date.now()}`,
      foodId: food.id,
      foodName: food.name,
      quantity: 1,
      donationDate: new Date().toISOString(),
      pointsEarned,
      status: 'completed',
    };
    store.totalPoints += pointsEarned;
    store.donations.unshift(donation);
    await saveStore(store);

    return NextResponse.json({ message: `Donation successful! You earned ${pointsEarned} points.`, ...responsePayload(store) }, { status: 201 });
  });
  donationQueue = operation.then(() => undefined, () => undefined);
  return operation;
}
