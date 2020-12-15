function generate() {
  function addDelay() {
    if (delays.length > 0) {
      return delays.pop();
    } else {
      return {
        type: "delay",
        time: 0
      };
    }
  }

  let delays = [];

  const skellies = val("skellies");
  const zombies = val("zombies");
  const witches = val("witches");

  for (let i = 0; i < skellies; i++) {
    delays.push({
      type: "skelly",
      time: 1
    });
  }

  for (let i = 0; i < zombies; i++) {
    delays.push({
      type: "zombie",
      time: 1
    });
  }

  for (let i = 0; i < witches; i++) {
    delays.push({
      type: "witch",
      time: 1
    });
  }

  if (checked("swiftness")) {
    delays.push({
      type: "swiftness",
      time: 7
    });
  }

  if (checked("strength")) {
    delays.push({
      type: "strength",
      time: 7
    });
  }

  if (checked("invis")) {
    delays.push({
      type: "invis",
      time: 7
    });
  }

  if (checked("poison")) {
    delays.push({
      type: "poison",
      time: 7
    });
  }

  if (checked("regen")) {
    delays.push({
      type: "regen",
      time: 7
    });
  }

  if (checked("rando")) {
    delays.push({
      type: "rando pot",
      time: 7
    });
  }

  delays = delays.reverse();

  const out = [];

  const woodenSwords = val("woodenSword");
  const stoneSwords = val("stoneSword");
  const ironSwords = val("ironSword");
  const diamondSwords = val("diamondSword");
  const bows = val("bow");
  const totems = val("totem");
  const gapples = val("gapple");

  for (let i = 0; i < woodenSwords; i++) {
    out.push({
      type: "Send wooden sword",
      time: 9
    });
  }

  for (let i = 0; i < stoneSwords; i++) {
    out.push({
      type: "Send stone sword",
      time: 9
    });
  }

  for (let i = 0; i < ironSwords; i++) {
    out.push({
      type: "Send iron sword",
      time: 9
    });
  }

  for (let i = 0; i < diamondSwords; i++) {
    out.push({
      type: "Send diamond sword",
      time: 9
    });
  }

  for (let i = 0; i < bows; i++) {
    out.push({
      type: "Send bow",
      time: 9
    });
  }

  for (let i = 0; i < totems; i++) {
    out.push({
      type: "Send totem",
      time: 9
    });
  }

  for (let i = 0; i < gapples; i++) {
    out.push({
      type: "Send gapple",
      time: 9
    });
  }

  const leatherArmor = val("leatherArmor");
  const ironArmor = val("ironArmor");
  const diamondArmor = val("diamondArmor");

  for (let i = 0; i < leatherArmor; i++) {
    out.push({
      type: "leather armor",
      time: 7
    });

    for (let j = 0; j < 5; j++) {
      out.push("delay");
    }

    out.push({
      type: "send armor stand",
      time: 3
    });
  }

  for (let i = 0; i < ironArmor; i++) {
    out.push({
      type: "iron armor",
      time: 7
    });

    for (let j = 0; j < 5; j++) {
      out.push("delay");
    }

    out.push({
      type: "send armor stand",
      time: 3
    });
  }

  for (let i = 0; i < diamondArmor; i++) {
    out.push({
      type: "diamond armor",
      time: 7
    });

    for (let j = 0; j < 5; j++) {
      out.push("delay");
    }

    out.push({
      type: "send armor stand",
      time: 3
    });
  }

  if (checked("swiftnessBeacon")) {
    out.splice(-15, out[out.length - 15] === "delay" ? 1 : 0, {
      type: "enable swiftness beacon",
      time: 15
    });
  } else {
    out.splice(-18, out[out.length - 18] === "delay" ? 1 : 0, {
      type: "disable swiftness beacon",
      time: 18
    });
  }

  if (checked("resistanceBeacon")) {
    out.splice(-16, out[out.length - 16] === "delay" ? 1 : 0, {
      type: "enable resistance beacon",
      time: 16
    });
  } else {
    out.splice(-18, out[out.length - 18] === "delay" ? 1 : 0, {
      type: "disable resistance beacon",
      time: 18
    });
  }

  if (checked("strengthBeacon")) {
    out.splice(-17, out[out.length - 17] === "delay" ? 1 : 0, {
      type: "enable strength beacon",
      time: 17
    });
  } else {
    out.splice(-18, out[out.length - 18] === "delay" ? 1 : 0, {
      type: "disable strength beacon",
      time: 18
    });
  }

  if (checked("regenBeacon")) {
    out.splice(-18, out[out.length - 18] === "delay" ? 1 : 0, {
      type: "enable regen beacon",
      time: 18
    });
  } else {
    out.splice(-18, out[out.length - 18] === "delay" ? 1 : 0, {
      type: "disable regen beacon",
      time: 18
    });
  }

  if (checked("music")) {
    out.splice(-18, out[out.length - 18] === "delay" ? 1 : 0, {
      type: "enable music",
      time: 18
    });
  }

  let delaysRequired = 1;

  while (delaysRequired > 0) {
    for (let i = 0; i < out.length; i++) {
      delaysRequired--;

      if (out[i] === "delay") {
        out[i] = addDelay();
      }

      if (out[i].time > delaysRequired) {
        delaysRequired = out[i].time;
      }
    }

    for (let i = 0; i < delaysRequired; i++) {
      out.push("delay");
    }
  }

  if (checked("nextRound")) {
    if (out[out.length - 1].type === "delay") {
      out.pop();
    }

    out.push({
      type: "Next round"
    });
  }

  const out2 = out.map(x => x.type);

  const ret = [{
    type: out2[0],
    amt: 1
  }];

  for (let i = 1; i < out2.length; i++) {
    if (ret[ret.length - 1].type === out2[i] && ret[ret.length - 1].amt < 64) {
      ret[ret.length - 1].amt++;
    } else {
      ret.push({
        type: out2[i],
        amt: 1
      });
    }
  }

  document.getElementById("out").innerHTML = `Time to queue: ${(out.length*2) + (checked("nextRound") ? 2 : 0)}s<br /><br />` + ret.map(x => `${x.type} - ${x.amt}`).join("<br />");
}

function val(id) {
  return parseInt(document.getElementById(id).value);
}

function checked(id) {
  return document.getElementById(id).checked;
}