import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding the database with dummy data...');

    // 1. Create an Admin user
    const admin = await prisma.user.upsert({
        where: { phone: '0000000000' },
        update: {},
        create: {
            name: 'Super Admin',
            phone: '0000000000',
            role: 'admin',
            flatNumber: 'ADMIN-OFFICE',
            societyId: 'HQ',
            status: 'VERIFIED',
        },
    });
    console.log(`✅ Admin created: ${admin.name} (Phone: ${admin.phone})`);

    // 2. Create some Guards
    const guard1 = await prisma.user.upsert({
        where: { phone: '1111111111' },
        update: {},
        create: {
            name: 'Ramesh Guard',
            phone: '1111111111',
            role: 'guard',
            flatNumber: 'MAIN-GATE',
            societyId: 'HQ',
            status: 'VERIFIED',
        },
    });

    const guard2 = await prisma.user.upsert({
        where: { phone: '2222222222' },
        update: {},
        create: {
            name: 'Suresh Guard',
            phone: '2222222222',
            role: 'guard',
            flatNumber: 'BACK-GATE',
            societyId: 'HQ',
            status: 'VERIFIED',
        },
    });
    console.log(`✅ Guards created: ${guard1.name}, ${guard2.name}`);

    // 3. Create some Residents
    const resident1 = await prisma.user.upsert({
        where: { phone: '9876543210' },
        update: {},
        create: {
            name: 'Yakshit Savaliya',
            phone: '9876543210',
            role: 'resident',
            flatNumber: 'A-101',
            societyId: 'HQ',
            status: 'VERIFIED',
        },
    });

    const resident2 = await prisma.user.upsert({
        where: { phone: '5555555555' },
        update: {},
        create: {
            name: 'Pending Neighbor',
            phone: '5555555555',
            role: 'resident',
            flatNumber: 'B-202',
            societyId: 'HQ',
            status: 'PENDING',
        },
    });

    const resident3 = await prisma.user.upsert({
        where: { phone: '3333333333' },
        update: {},
        create: {
            name: 'Alice Resident',
            phone: '3333333333',
            role: 'resident',
            flatNumber: 'C-303',
            societyId: 'HQ',
            status: 'VERIFIED',
        },
    });
    console.log(`✅ Residents created: ${resident1.name}, ${resident2.name}, ${resident3.name}`);

    // 4. Create some Visits
    // Clear out visits first for a fresh timeline if we re-seed
    await prisma.visit.deleteMany({});
    
    await prisma.visit.create({
        data: {
            visitorName: 'Amazon Delivery',
            visitorPhone: '9998887776',
            purpose: 'Delivery',
            flatNumber: 'A-101',
            status: 'PENDING', // Waiting for Yakshit to approve
            residentId: resident1.id,
            guardId: guard1.id,
        },
    });

    await prisma.visit.create({
        data: {
            visitorName: 'Plumber',
            visitorPhone: '8887776665',
            purpose: 'Maintenance',
            flatNumber: 'C-303',
            status: 'APPROVED', 
            residentId: resident3.id,
            guardId: guard2.id,
            entryTime: new Date(Date.now() - 3600000), // 1 hour ago
            exitTime: new Date(), // Just left
        },
    });

    await prisma.visit.create({
        data: {
            visitorName: 'Swiggy Food',
            visitorPhone: '7776665554',
            purpose: 'Delivery',
            flatNumber: 'A-101',
            status: 'DENIED', 
            residentId: resident1.id,
            guardId: guard1.id,
            entryTime: new Date(Date.now() - 86400000), // 1 day ago
        },
    });

    console.log('✅ Visits populated!');
    console.log('--- SEEDING COMPLETE ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
