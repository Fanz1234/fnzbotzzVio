 

export async function register(m) {
  try {
    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    const prefix = db.data.settings["settingbot"].prefix;

    //const premium = db.data.user[m.sender].premiumTime !== 0
    //const isPremium = isOwner ? true : _prem.checkPremiumUser(m.sender, premium)

    //if(isCmd || isOwner || isPremium){
    if (user) {
      if (!("id" in user)) user.id = m.senderNumber;
      if (!("grade" in user)) user.grade = "Newbie";
      if (!("autolevelup" in user)) user.autolevelup = false;
      if (!("serial" in user)) user.serial = makeid(4).toUpperCase();
      if (!isNumber(user.glimit)) user.glimit = 30;
      if (!isNumber(user.hit)) user.hit = 1;
      if (!("date" in user)) user.date = calender;
      if (!isNumber(user.money)) user.money = 0;
      if (!isNumber(user.exp)) user.exp = 0;
      if (!isNumber(user.limit)) user.limit = 10;
      if (!isNumber(user.freelimit)) if (!isNumber(user.speed)) user.speed = 0;
      if (!isNumber(user.strength)) user.strength = 0;
      if (!isNumber(user.defense)) user.defense = 0;
      if (!isNumber(user.skata)) user.skata = 0;
      if (!isNumber(user.joinlimit)) user.joinlimit = 1;
      if (!isNumber(user.pc)) user.pc = 0;
      if (!isNumber(user.ojekk)) user.ojekk = 0;
      if (!("registered" in user)) user.registered = false;
      if (!user.registered) {
        if (!("name" in user)) user.name = m.pushname;
        if (!("skill" in user)) user.skill = "";
        if (!("pasangan" in user)) user.pasangan = "";
        if (!isNumber(user.age)) user.age = -1;
        if (!isNumber(user.regTime)) user.regTime = -1;
      }
      if (!isNumber(user.afk)) user.afk = -1;
      if (!("unreg" in user)) user.unreg = false;
      if (!("afkReason" in user)) user.afkReason = "";
      if (!("banned" in user)) user.banned = false;
      if (!("lastBanned" in user)) user.lastBanned = 0;
      if (!"BannedReason" in user) user.BannedReason = "";
      if (!"WarnReason" in user) user.WarnReason = "";
      if (!isNumber(user.warning)) user.warning = 0;
      if (!isNumber(user.level)) user.level = 0;
      if (!("role" in user)) user.role = "Beginner";

      if (!isNumber(user.skillexp)) user.skillexp = 0;
      if (!isNumber(user.chip)) user.chip = 0;
      if (!isNumber(user.atm)) user.atm = 0;
      if (!isNumber(user.fullatm)) user.fullatm = 0;
      if (!isNumber(user.bank)) user.bank = 0;
      if (!isNumber(user.health)) user.health = 100;
      if (!isNumber(user.stamina)) user.stamina = 100;
      if (!isNumber(user.potion)) user.potion = 0;
      if (!isNumber(user.wine)) user.wine = 0;
      if (!isNumber(user.beer)) user.beer = 0;
      if (!isNumber(user.trash)) user.trash = 0;
      if (!isNumber(user.coal)) user.coal = 0;
      if (!isNumber(user.wood)) user.wood = 0;
      if (!isNumber(user.rock)) user.rock = 0;
      if (!isNumber(user.string)) user.string = 0;
      if (!isNumber(user.petfood)) user.petfood = 0;

      if (!isNumber(user.hubungan)) user.hubungan = 0;
      if (!isNumber(user.lokasi)) user.lokasi = 0;
      if (!isNumber(user.emerald)) user.emerald = 0;
      if (!isNumber(user.diamond)) user.diamond = 0;
      if (!isNumber(user.gold)) user.gold = 0;
      if (!isNumber(user.botol)) user.botol = 0;
      if (!isNumber(user.kardus)) user.kardus = 0;
      if (!isNumber(user.kaleng)) user.kaleng = 0;
      if (!isNumber(user.gelas)) user.gelas = 0;
      if (!isNumber(user.plastik)) user.plastik = 0;
      if (!isNumber(user.iron)) user.iron = 0;
      if (!isNumber(user.rawdiamond)) user.rawdiamond = 0;
      if (!isNumber(user.rawgold)) user.rawgold = 0;
      if (!isNumber(user.rawiron)) user.rawiron = 0;

      if (!isNumber(user.common)) user.common = 0;
      if (!isNumber(user.uncommon)) user.uncommon = 0;
      if (!isNumber(user.mythic)) user.mythic = 0;
      if (!isNumber(user.tbox)) user.tbox = 0;
      if (!isNumber(user.legendary)) user.legendary = 0;
      if (!isNumber(user.kondom)) user.kondom = 0;
      if (!isNumber(user.umpan)) user.umpan = 0;
      if (!isNumber(user.pet)) user.pet = 0;

      if (!isNumber(user.paus)) user.paus = 0;
      if (!isNumber(user.kepiting)) user.kepiting = 0;
      if (!isNumber(user.gurita)) user.gurita = 0;
      if (!isNumber(user.cumi)) user.cumi = 0;
      if (!isNumber(user.buntal)) user.buntal = 0;
      if (!isNumber(user.dory)) user.dory = 0;
      if (!isNumber(user.lumba)) user.lumba = 0;
      if (!isNumber(user.lobster)) user.lobster = 0;
      if (!isNumber(user.hiu)) user.hiu = 0;
      if (!isNumber(user.udang)) user.udang = 0;
      if (!isNumber(user.orca)) user.orca = 0;

      if (!isNumber(user.banteng)) user.banteng = 0;
      if (!isNumber(user.gajah)) user.gajah = 0;
      if (!isNumber(user.harimau)) user.harimau = 0;
      if (!isNumber(user.kambing)) user.kambing = 0;
      if (!isNumber(user.panda)) user.panda = 0;
      if (!isNumber(user.buaya)) user.buaya = 0;
      if (!isNumber(user.kerbau)) user.kerbau = 0;
      if (!isNumber(user.sapi)) user.sapi = 0;
      if (!isNumber(user.monyet)) user.monyet = 0;
      if (!isNumber(user.babihutan)) user.babihutan = 0;
      if (!isNumber(user.babi)) user.babi = 0;
      if (!isNumber(user.ayam)) user.ayam = 0;
      if (!isNumber(user.steak)) user.steak = 0;
      if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0;
      if (!isNumber(user.ayambakar)) user.ayambakar = 0;
      if (!isNumber(user.burger)) user.burger = 0;
      if (!isNumber(user.pizza)) user.pizza = 0;

      if (!isNumber(user.lastadventure)) user.lastadventure = 0;
      if (!isNumber(user.lastkill)) user.lastkill = 0;
      if (!isNumber(user.lastmisi)) user.lastmisi = 0;
      if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
      if (!isNumber(user.lastwar)) user.lastwar = 0;
      if (!isNumber(user.lastsda)) user.lastsda = 0;
      if (!isNumber(user.lastduel)) user.lastduel = 0;
      if (!isNumber(user.lastmining)) user.lastmining = 0;
      if (!isNumber(user.lasthunt)) user.lasthunt = 0;
      if (!isNumber(user.lastgift)) user.lastgift = 0;
      if (!isNumber(user.lastberkebon)) user.lastberkebon = 0;
      if (!isNumber(user.lastdagang)) user.lastdagang = 0;
      if (!isNumber(user.lasthourly)) user.lasthourly = 0;
      if (!isNumber(user.lastbansos)) user.lastbansos = 0;
      if (!isNumber(user.lastrampok)) user.lastrampok = 0;
      if (!isNumber(user.lastclaim)) user.lastclaim = 0;
      if (!isNumber(user.lastnebang)) user.lastnebang = 0;
      if (!isNumber(user.lastweekly)) user.lastweekly = 0;
      if (!isNumber(user.lastmonthly)) user.lastmonthly = 0;

      if (!isNumber(user.apel)) user.apel = 0;
      if (!isNumber(user.anggur)) user.anggur = 0;
      if (!isNumber(user.jeruk)) user.jeruk = 0;
      if (!isNumber(user.mangga)) user.mangga = 0;
      if (!isNumber(user.pisang)) user.pisang = 0;
      if (!isNumber(user.makanan)) user.makanan = 0;
      if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
      if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
      if (!isNumber(user.bibitapel)) user.bibitapel = 0;
      if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
      if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;

      if (!isNumber(user.horse)) user.horse = 0;
      if (!isNumber(user.horseexp)) user.horseexp = 0;
      if (!isNumber(user.cat)) user.cat = 0;
      if (!isNumber(user.catexp)) user.catexp = 0;
      if (!isNumber(user.fox)) user.fox = 0;
      if (!isNumber(user.foxexp)) user.foxexp = 0;
      if (!isNumber(user.dog)) user.foxexp = 0;
      if (!isNumber(user.dogexp)) user.dogexp = 0;
      if (!isNumber(user.robo)) user.robo = 0;
      if (!isNumber(user.roboexp)) user.roboexp = 0;
      if (!isNumber(user.dragon)) user.dragon = 0;
      if (!isNumber(user.dragonexp)) user.dragonexp = 0;
      if (!isNumber(user.dino)) user.dino = 0;
      if (!isNumber(user.dinoexp)) user.dinoexp = 0;
      if (!isNumber(user.unicorn)) user.unicorn = 0;
      if (!isNumber(user.unicornexp)) user.unicornexp = 0;
      if (!isNumber(user.tano)) user.tano = 0;
      if (!isNumber(user.tanoexp)) user.tanoexp = 0;

      if (!isNumber(user.horselastfeed)) user.horselastfeed = 0;
      if (!isNumber(user.catlastfeed)) user.catlastfeed = 0;
      if (!isNumber(user.robolastfeed)) user.robolastfeed = 0;
      if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0;
      if (!isNumber(user.doglastfeed)) user.doglastfeed = 0;
      if (!isNumber(user.dragonlastfeed)) user.dragonlastfeed = 0;
      if (!isNumber(user.dinolastfeed)) user.dinolastfeed = 0;
      if (!isNumber(user.unicornlastfeed)) user.unicornlastfeed = 0;
      if (!isNumber(user.tanolastfeed)) user.tanolastfeed = 0;

      if (!isNumber(user.robo)) user.robo = 0;
      if (!isNumber(user.robodurability)) user.robodurability = 0;
      if (!isNumber(user.armor)) user.armor = 0;
      if (!isNumber(user.armordurability)) user.armordurability = 0;
      if (!isNumber(user.sword)) user.sword = 0;
      if (!isNumber(user.sworddurability)) user.sworddurability = 0;
      if (!isNumber(user.pickaxe)) user.pickaxe = 0;
      if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0;
      if (!isNumber(user.fishingrod)) user.fishingrod = 0;
      if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0;


      if (!("sticker" in user)) user.sticker = {};
      if (!("premium" in user)) user.premium = false;
      if (!isNumber(user.premiumTime)) user.premiumTime = 0;
      if (!isNumber(user.joinlimit)) user.joinlimit = 0;
      if (!("timeOrder" in user)) user.timeOrder = "";
      if (!("timeEnd" in user)) user.timeEnd = "";
    } else
      global.db.data.users[m.sender] = {
        name: m.pushname,
        money: 0,
        exp: 0,
        limit: 20,
        freelimit: 0,
        skata: 0,
        registered: false,
        pasangan: 0,
        id: m.senderNumber,
        date: calender,
        hit: 0,
        glimit: 30,
        serial: makeid(4).toUpperCase(),
        grade: "Newbie",
        autolevelup: false,

        lokasi: 0,
        hubungan: 0,
        pc: 0,
        joinlimit: 1,
        speed: 0,
        strength: 0,
        defense: 0,
        skill: 0,
        skillexp: 0,
        age: -1,
        regTime: -1,
        unreg: false,
        afk: -1,
        afkReason: "",
        banned: false,
        warning: 0,
        level: 0,
        rokets: 0,
        role: "Beginner",
        makanan: 0,
        ojekk: 0,
        BannedReason: "",
        WarnReason: "",

        chip: 0,
        bank: 0,
        atm: 0,
        fullatm: 0,
        health: 100,
        stamina: 100,
        potion: 10,
        wine: 0,
        beer: 0,
        trash: 0,
        wood: 0,
        coal: 0,
        rock: 0,
        string: 0,
        emerald: 0,
        diamond: 0,
        gold: 0,
        iron: 0,
        rawdiamond: 0,
        rawgold: 0,
        rawiron: 0,
        common: 0,
        uncommon: 0,
        mythic: 0,
        tbox: 0,
        legendary: 0,
        umpan: 0,
        kondom: 0,
        pet: 0,
        horse: 0,
        horseexp: 0,
        horselastfeed: 0,
        cat: 0,
        catexp: 0,
        catlastfeed: 0,
        fox: 0,
        foxexp: 0,
        foxlastfeed: 0,
        robo: 0,
        roboexp: 0,
        robolastfeed: 0,
        dog: 0,
        dogexp: 0,
        doglastfeed: 0,
        dragon: 0,
        dragonexp: 0,
        dragonlastfeed: 0,
        dino: 0,
        dinoexp: 0,
        dinolastfeed: 0,
        unicorn: 0,
        unicornexp: 0,
        unicornlastfeed: 0,
        tano: 0,
        tanoexp: 0,
        tanolastfeed: 0,

        paus: 0,
        kepiting: 0,
        gurita: 0,
        cumi: 0,
        buntal: 0,
        dory: 0,
        lumba: 0,
        lobster: 0,
        hiu: 0,
        udang: 0,
        ikan: 0,
        orca: 0,
        banteng: 0,
        harimau: 0,
        gajah: 0,
        kambing: 0,
        buaya: 0,
        kerbau: 0,
        sapi: 0,
        monyet: 0,
        babi: 0,
        ayam: 0,
        steak: 0,
        pizza: 0,
        burger: 0,
        ayambakar: 0,
        kepitingbakar: 0,

        armor: 0,
        armordurability: 0,
        sword: 0,
        sworddurability: 0,
        pickaxe: 0,
        pickaxedurability: 0,
        fishingrod: 0,
        fishingroddurability: 0,
        robo: 0,
        robodurability: 0,
        apel: 20,
        pisang: 0,
        anggur: 0,
        mangga: 0,
        jeruk: 0,

        lastadventure: 0,
        lastkill: 0,
        lastmisi: 0,
        lastdungeon: 0,
        lastwar: 0,
        lastsda: 0,
        lastduel: 0,
        lastmining: 0,
        lasthunt: 0,
        lastgift: 0,
        lastberkebon: 0,
        lastdagang: 0,
        lasthourly: 0,
        lastbansos: 0,
        lastrampok: 0,
        lastclaim: 0,
        lastnebang: 0,
        lastweekly: 0,
        lastmonthly: 0,

        premium: false,
        premiumTime: 0,
        timeOrder: "",
        timeEnd: "",
        sticker: {},
      };

    //}// akhir if(iscmd)

    if (m.isGroup) {
      if (chat) {
        if (!("name" in chat)) chat.name = m.groupNmae;
        if (!isNumber(chat.hit)) chat.hit = 0;
        if (!isNumber(chat.add)) chat.add = 0;
        if (!("welcome" in chat)) chat.welcome = true;
        if (!("id" in chat)) chat.id = m.chat;
        if (!("detect" in chat)) chat.detect = true;
        if (!("sWelcome" in chat)) chat.sWelcome = "";
        if (!("sBye" in chat)) chat.sBye = "";
        if (!("sPromote" in chat)) chat.sPromote = "";
        if (!("sDemote" in chat)) chat.sDemote = "";
        if (!("desc" in chat)) chat.desc = true;
        if (!("descUpdate" in chat)) chat.descUpdate = true;
        if (!("stiker" in chat)) chat.stiker = false;
        if (!("antiLink" in chat)) chat.antiLink = true;
        if (!isNumber(chat.expired)) chat.expired = 0;
        if (!("antiBadword" in chat)) chat.antiBadword = true;
        if (!("antispam" in chat)) chat.antispam = true;
        if (!("antitroli" in chat)) chat.antitroli = false;
        if (!("antivirtex" in chat)) chat.antivirtex = false;
        if (!("updateGempa" in chat)) chat.updateGempa = false;
        if (!("viewonce" in chat)) chat.viewonce = true;
        if (!("nsfw" in chat)) chat.nsfw = false;
        if (!("clear" in chat)) chat.clear = false;
        if (!("rpg" in chat)) chat.rpg = false;
        if (!("game" in chat)) chat.game = true;
        if (!("autolevelup" in chat)) chat.autolevelup = false;
        if (!("simi" in chat)) chat.simi = true;
        if (!isNumber(chat.cleartime)) chat.clearTime = 0;
        if (!isNumber(chat.open)) chat.open = 0;
        if (!isNumber(chat.close)) chat.close = 0;

        if (!("opened" in chat)) chat.opened = false;
        if (!("closed" in chat)) chat.closed = false;
        if (!("timeOpen" in chat)) chat.timeOpen = "";
        if (!("timeClose" in chat)) chat.timeClose = "";
        if (!("antiporn" in chat)) chat.antiporn = false;
        if (!("tenDaysLeft" in chat)) chat.tenDaysLeft = false;
        if (!("treeDaysLeft" in chat)) chat.treeDaysLeft = false;
        if (!("oneDaysLeft" in chat)) chat.oneDaysLeft = false;
        if (!("endDays" in chat)) chat.oneDaysLeft = false;
        if (!("linkgc" in chat)) chat.linkgc = "";
        if (!("timeOrder" in chat)) chat.timeOrder = "";
        if (!("timeEnd" in chat)) chat.timeEnd = "";
        if (!("creator" in chat)) chat.creator = "";
        if (!("welcomeImage" in chat)) chat.welcomeImage = "";
        if (!("leaveImage" in chat)) chat.leaveImage = "";
      } else
        global.db.data.chats[m.chat] = {
          name: m.groupName,
          hit: 0,
          add: 0,
          id: m.chat,
          welcome: false,
          detect: true,
          sWelcome: "",
          sBye: "",
          sPromote: "",
          sDemote: "",
          desc: true,
          descUpdate: true,
          autostiker: false,
          antilink: false,
          antilinkgc: false,
          antidelete: false,
          antiasing: false,
          banchat: false,
          expired: 0,
          antibadword: true,
          antispam: true,
          antitroli: false,
          antivirtex: false,
          antihidetag: false,
          viewonce: true,
          nsfw: false,
          clear: false,
          clearTime: 0,
          rpg: false,
          game: true,
          autolevelup: false,
          simi: true,
          open: 0,
          close: 0,
          opened: false,
          closed: false,
          timeOpen: "",
          timeClose: "",
          antiporn: false,
          tenDaysLeft: false,
          treeDaysLeft: false,
          oneDaysLeft: false,
          endDays: false,
          linkgc: "",
          timeOrder: "",
          timeEnd: "",
          creator: "",
          welcomeImage:'',
          leaveImage:'',
        };
    }

    //akhir fungsi register
  } catch (e) {
    console.error(e);
  }
}
