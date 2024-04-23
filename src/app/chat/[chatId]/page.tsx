// page probably obsolete -> individual chats will be shown in Chat component not in subdomain

import React from "react";

interface IPageProps {
  params: {
    chatId: string;
  };
}

export default function IndividualChat({ params }: Pageprops) {
  return <div>{params.chatId}</div>;
}
