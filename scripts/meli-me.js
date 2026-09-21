import { apiRequest } from "../src/meli.js";

const user = await apiRequest("/users/me");
console.log(JSON.stringify({ id: user.id, nickname: user.nickname, site_id: user.site_id }, null, 2));
