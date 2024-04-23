import React from "react";

export default function Chat({ chatId }) {
  // async function getChatMessages(chatId){
  //     try {
  //         const results: string[] = await fetchRedis(
  //             "zrange",
  //             `chat:${chatId}: messages`,
  //             0,
  //             -1
  //         )
  //     }
  // }
  return (
    <section className="flex mt-8 gap-4">
      <div>
        <h2 className="font-bold">Open Chats</h2>
        <ul>
          <li>Tatiana</li>
          <li>Tatiana</li>
          <li>Tatiana</li>
          <li>Tatiana</li>
          <li>Tatiana</li>
          <li>Tatiana</li>
          <li>Tatiana</li>
          <li>Tatiana</li>
        </ul>
      </div>
      <div>CHATWINDOW (changes according to click on names to the left)</div>
    </section>
  );
}
