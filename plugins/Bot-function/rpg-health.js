let handler = (m) => m;

handler.before = async function (m) {
  let user = db.data.users[m.sender];
  if (user) {
    if (user.health > 100) {
      user.health = 100;
    }
    if (user.health < 0) {
      user.health = 0;
    }

    if (user.stamina > 100) {
      user.stamina = 100;
    }
    if (user.stamina < 0) {
      user.stamina = 0;
    }
  }
};

export default handler;
