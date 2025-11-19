import { NotionAPI } from "notion-client";

const notionClient = new NotionAPI({
    authToken: process.env.NEXT_PUBLIC_NOTION_TOKENV2,
    activeUser: process.env.NEXT_PUBLIC_NOTION_USER_ID,
});

export default notionClient;