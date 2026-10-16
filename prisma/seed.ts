import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { phone: "+2348123456789" },
    update: {},
    create: {
      phone: "+2348123456789",
      countryCode: "+234",
      displayName: "Ada Johnson",
      avatarUrl: "https://images.example.com/ada.jpg",
      about: "Product manager shipping the next generation of messaging.",
      isOnline: true,
      role: "USER",
    },
  });

  const secondUser = await prisma.user.upsert({
    where: { phone: "+2348030000000" },
    update: {},
    create: {
      phone: "+2348030000000",
      countryCode: "+234",
      displayName: "Maya Okafor",
      avatarUrl: "https://images.example.com/maya.jpg",
      about: "Designing the future of customer conversations.",
      isOnline: false,
      role: "USER",
    },
  });

  const conversation = await prisma.conversation.upsert({
    where: { id: "conv-demo" },
    update: {},
    create: {
      id: "conv-demo",
      type: "DIRECT",
      title: "Ada Johnson",
      description: "Direct chat for the first messaging milestone",
      createdById: user.id,
      updatedAt: new Date(),
    },
  });

  await prisma.conversationMember.upsert({
    where: { conversationId_userId: { conversationId: conversation.id, userId: user.id } },
    update: {},
    create: {
      conversationId: conversation.id,
      userId: user.id,
      role: "OWNER",
      notificationLevel: "ALL",
    },
  });

  await prisma.conversationMember.upsert({
    where: { conversationId_userId: { conversationId: conversation.id, userId: secondUser.id } },
    update: {},
    create: {
      conversationId: conversation.id,
      userId: secondUser.id,
      role: "MEMBER",
      notificationLevel: "ALL",
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        senderId: user.id,
        type: "TEXT",
        body: "Hey there! I just set up ChatWave.",
      },
      {
        conversationId: conversation.id,
        senderId: secondUser.id,
        type: "TEXT",
        body: "Looks great — I can already feel the new app coming together.",
      },
    ],
  });

  console.log("Seed completed: demo users and direct conversation created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
