const _0x2bfe11 = _0x22db;
(function (_0xde05a1, _0x5dfbd3) {
  const _0x105833 = _0x22db,
    _0x277dc9 = _0xde05a1();
  while (!![]) {
    try {
      const _0x2b85dc =
        parseInt(_0x105833(0xe6)) / 0x1 +
        -parseInt(_0x105833(0xf5)) / 0x2 +
        parseInt(_0x105833(0x12c)) / 0x3 +
        -parseInt(_0x105833(0xf8)) / 0x4 +
        parseInt(_0x105833(0x116)) / 0x5 +
        (-parseInt(_0x105833(0x115)) / 0x6) *
          (-parseInt(_0x105833(0x131)) / 0x7) +
        (parseInt(_0x105833(0x10e)) / 0x8) * (-parseInt(_0x105833(0xee)) / 0x9);
      if (_0x2b85dc === _0x5dfbd3) break;
      else _0x277dc9["push"](_0x277dc9["shift"]());
    } catch (_0x669f7f) {
      _0x277dc9["push"](_0x277dc9["shift"]());
    }
  }
})(_0x3710, 0x500f8);
import _0x2e7150 from "jimp";
const resize = async (_0x44bcba, _0x212428, _0x45f87c) => {
  const _0x29b1e5 = _0x22db,
    _0x2fdef5 = await _0x2e7150[_0x29b1e5(0x103)](_0x44bcba),
    _0x1fff2f = await _0x2fdef5[_0x29b1e5(0xfa)](_0x212428, _0x45f87c)[
      "getBufferAsync"
    ](_0x2e7150[_0x29b1e5(0x110)]);
  return _0x1fff2f;
};
function _0x22db(_0x2ad37d, _0x3558d2) {
  const _0x371017 = _0x3710();
  return (
    (_0x22db = function (_0x22dbe5, _0x2e71b9) {
      _0x22dbe5 = _0x22dbe5 - 0xda;
      let _0x1ace91 = _0x371017[_0x22dbe5];
      return _0x1ace91;
    }),
    _0x22db(_0x2ad37d, _0x3558d2)
  );
}
import {
  emoji_role,
  sesi,
  playerOnGame,
  playerOnRoom,
  playerExit,
  dataPlayer,
  dataPlayerById,
  getPlayerById,
  getPlayerById2,
  killWerewolf,
  killww,
  dreamySeer,
  sorcerer,
  protectGuardian,
  roleShuffle,
  roleChanger,
  roleAmount,
  roleGenerator,
  addTimer,
  startGame,
  playerHidup,
  playerMati,
  vote,
  voteResult,
  clearAllVote,
  getWinner,
  win,
  pagi,
  malam,
  skill,
  voteStart,
  voteDone,
  voting,
  run,
  run_vote,
  run_malam,
  run_pagi,
} from "../../lib/werewolf.js";
let thumb = _0x2bfe11(0x120);
const handler = async (
  _0x3af77f,
  {
    conn: _0x5ced47,
    command: _0x372075,
    usedPrefix: _0x498914,
    b: _0x749d49,
    args: _0x4cf638,
  }
) => {
  const _0x54d98d = _0x2bfe11,
    { sender: _0x504399, chat: _0x96aff2 } = _0x3af77f;
  _0x5ced47[_0x54d98d(0x10d)] = _0x5ced47[_0x54d98d(0x10d)]
    ? _0x5ced47[_0x54d98d(0x10d)]
    : {};
  const _0x2a43af = _0x5ced47["werewolf"] ? _0x5ced47[_0x54d98d(0x10d)] : {},
    _0x1bd26e = _0x2a43af[_0x96aff2],
    _0x50605d = _0x4cf638[0x0],
    _0x267cb4 = _0x4cf638[0x1];
  if (_0x50605d === _0x54d98d(0xfc)) {
    if (_0x96aff2 in _0x2a43af)
      return _0x3af77f[_0x54d98d(0x12f)](
        "Group\x20masih\x20dalam\x20sesi\x20permainan"
      );
    if (playerOnGame(_0x504399, _0x2a43af) === !![])
      return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x119));
    (_0x2a43af[_0x96aff2] = {
      room: _0x96aff2,
      owner: _0x504399,
      status: ![],
      iswin: null,
      cooldown: null,
      day: 0x0,
      time: _0x54d98d(0x105),
      player: [],
      dead: [],
      voting: ![],
      seer: ![],
      guardian: [],
    }),
      await _0x3af77f[_0x54d98d(0x12f)](
        "Room\x20berhasil\x20dibuat,\x20ketik\x20*.ww\x20join*\x20untuk\x20bergabung"
      );
  } else {
    if (_0x50605d === _0x54d98d(0x11d)) {
      if (!_0x2a43af[_0x96aff2])
        return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x107));
      if (_0x2a43af[_0x96aff2][_0x54d98d(0x10b)] === !![])
        return _0x3af77f[_0x54d98d(0x12f)](
          "Sesi\x20permainan\x20sudah\x20dimulai"
        );
      if (_0x2a43af[_0x96aff2]["player"][_0x54d98d(0xf2)] > 0x10)
        return _0x3af77f[_0x54d98d(0x12f)](
          "Maaf\x20jumlah\x20player\x20telah\x20penuh"
        );
      if (playerOnRoom(_0x504399, _0x96aff2, _0x2a43af) === !![])
        return _0x3af77f["reply"](_0x54d98d(0x11c));
      if (playerOnGame(_0x504399, _0x2a43af) === !![])
        return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x119));
      let _0x4542a1 = {
        id: _0x504399,
        number: _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x54d98d(0xf2)] + 0x1,
        sesi: _0x96aff2,
        status: ![],
        role: ![],
        effect: [],
        vote: 0x0,
        isdead: ![],
        isvote: ![],
      };
      _0x2a43af[_0x96aff2][_0x54d98d(0x123)]["push"](_0x4542a1);
      let _0x41ee2a = [],
        _0x282786 =
          "\x0a*⌂\x20W\x20E\x20R\x20E\x20W\x20O\x20L\x20F\x20-\x20P\x20L\x20A\x20Y\x20E\x20R*\x0a\x0a";
      for (
        let _0x549528 = 0x0;
        _0x549528 < _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x54d98d(0xf2)];
        _0x549528++
      ) {
        (_0x282786 +=
          _0x2a43af[_0x96aff2]["player"][_0x549528][_0x54d98d(0x129)] +
          _0x54d98d(0x124) +
          _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x549528]["id"][
            _0x54d98d(0x108)
          ]("@s.whatsapp.net", "") +
          "\x0a"),
          _0x41ee2a[_0x54d98d(0xf7)](
            _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x549528]["id"]
          );
      }
      (_0x282786 += _0x54d98d(0xf9)),
        _0x5ced47["sendMessage"](
          _0x3af77f[_0x54d98d(0xfb)],
          {
            text: _0x282786[_0x54d98d(0xe2)](),
            contextInfo: {
              externalAdReply: {
                title: _0x54d98d(0xdd),
                mediaType: 0x1,
                renderLargerThumbnail: !![],
                thumbnail: await resize(thumb, 0x12c, 0xaf),
                sourceUrl: "",
                mediaUrl: thumb,
              },
              mentionedJid: _0x41ee2a,
            },
          },
          { quoted: _0x3af77f }
        );
    } else {
      if (_0x50605d === _0x54d98d(0xed)) {
        if (!_0x2a43af[_0x96aff2]) return _0x3af77f["reply"](_0x54d98d(0x107));
        if (_0x2a43af[_0x96aff2][_0x54d98d(0x123)]["length"] === 0x0)
          return _0x3af77f["reply"](_0x54d98d(0xe5));
        if (_0x2a43af[_0x96aff2]["player"][_0x54d98d(0xf2)] < 0x5)
          return _0x3af77f["reply"](_0x54d98d(0x126));
        if (playerOnRoom(_0x504399, _0x96aff2, _0x2a43af) === ![])
          return _0x3af77f["reply"](
            "Kamu\x20belum\x20join\x20dalam\x20room\x20ini"
          );
        if (_0x2a43af[_0x96aff2][_0x54d98d(0xfe)] > 0x0) {
          if (_0x2a43af[_0x96aff2]["time"] === "voting")
            return (
              clearAllVote(_0x96aff2, _0x2a43af),
              addTimer(_0x96aff2, _0x2a43af),
              await run_vote(_0x5ced47, _0x96aff2, _0x2a43af)
            );
          else {
            if (_0x2a43af[_0x96aff2]["time"] === _0x54d98d(0x105))
              return (
                clearAllVote(_0x96aff2, _0x2a43af),
                addTimer(_0x96aff2, _0x2a43af),
                await run_malam(_0x5ced47, _0x96aff2, _0x2a43af)
              );
            else {
              if (_0x2a43af[_0x96aff2][_0x54d98d(0xf6)] === _0x54d98d(0x128))
                return (
                  clearAllVote(_0x96aff2, _0x2a43af),
                  addTimer(_0x96aff2, _0x2a43af),
                  await run_pagi(_0x5ced47, _0x96aff2, _0x2a43af)
                );
            }
          }
        }
        if (_0x2a43af[_0x96aff2][_0x54d98d(0x10b)] === !![])
          return _0x3af77f["reply"](_0x54d98d(0xf0));
        if (_0x2a43af[_0x96aff2]["owner"] !== _0x504399)
          return _0x3af77f[_0x54d98d(0x12f)](
            _0x54d98d(0xef) +
              _0x2a43af[_0x96aff2][_0x54d98d(0xe7)]["split"]("@")[0x0] +
              "\x20yang\x20dapat\x20memulai\x20permainan",
            { withTag: !![] }
          );
        let _0x4edbe4 = "",
          _0xa63892 = "",
          _0x5a8ac3 = [];
        roleGenerator(_0x96aff2, _0x2a43af),
          addTimer(_0x96aff2, _0x2a43af),
          startGame(_0x96aff2, _0x2a43af);
        for (
          let _0x525a89 = 0x0;
          _0x525a89 < _0x2a43af[_0x96aff2]["player"][_0x54d98d(0xf2)];
          _0x525a89++
        ) {
          (_0x4edbe4 +=
            "(" +
            _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x525a89]["number"] +
            _0x54d98d(0x124) +
            _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x525a89]["id"]["replace"](
              _0x54d98d(0xdc),
              ""
            ) +
            "\x0a"),
            _0x5a8ac3["push"](
              _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x525a89]["id"]
            );
        }
        for (
          let _0x24364c = 0x0;
          _0x24364c < _0x2a43af[_0x96aff2][_0x54d98d(0x123)]["length"];
          _0x24364c++
        ) {
          (_0xa63892 +=
            "(" +
            _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x24364c][
              _0x54d98d(0x129)
            ] +
            _0x54d98d(0x124) +
            _0x2a43af[_0x96aff2]["player"][_0x24364c]["id"]["replace"](
              _0x54d98d(0xdc),
              ""
            ) +
            "\x20" +
            (_0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x24364c][
              _0x54d98d(0x130)
            ] === "werewolf" ||
            _0x2a43af[_0x96aff2]["player"][_0x24364c][_0x54d98d(0x130)] ===
              "sorcerer"
              ? "[" +
                _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x24364c]["role"] +
                "]"
              : "") +
            "\x0a"),
            _0x5a8ac3[_0x54d98d(0xf7)](
              _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x24364c]["id"]
            );
        }
        for (
          let _0x174092 = 0x0;
          _0x174092 < _0x2a43af[_0x96aff2][_0x54d98d(0x123)]["length"];
          _0x174092++
        ) {
          if (
            _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092][
              _0x54d98d(0x130)
            ] === _0x54d98d(0x10d)
          ) {
            if (
              _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["isdead"] !=
              !![]
            ) {
              var _0x2a4bfd =
                "Hai\x20" +
                _0x5ced47[_0x54d98d(0xdf)](
                  _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"]
                ) +
                ",\x20Kamu\x20telah\x20dipilih\x20untuk\x20memerankan\x20*Werewolf*\x20" +
                emoji_role(_0x54d98d(0x10d)) +
                _0x54d98d(0x104) +
                _0xa63892 +
                "\x0a\x0aKetik\x20*.wwpc\x20kill\x20nomor*\x20untuk\x20membunuh\x20player";
              await _0x5ced47[_0x54d98d(0xde)](
                _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"],
                { text: _0x2a4bfd, mentions: _0x5a8ac3 }
              );
            }
          } else {
            if (
              _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092][
                _0x54d98d(0x130)
              ] === _0x54d98d(0x12b)
            ) {
              if (
                _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["isdead"] !=
                !![]
              ) {
                let _0x4b0f35 =
                  _0x54d98d(0x118) +
                  _0x5ced47["getName"](
                    _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"]
                  ) +
                  _0x54d98d(0xf1) +
                  emoji_role(_0x54d98d(0x12b)) +
                  _0x54d98d(0x12a) +
                  _0x4edbe4;
                await _0x5ced47[_0x54d98d(0xde)](
                  _0x2a43af[_0x96aff2]["player"][_0x174092]["id"],
                  { text: _0x4b0f35, mentions: _0x5a8ac3 }
                );
              }
            } else {
              if (
                _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["role"] ===
                _0x54d98d(0x109)
              ) {
                if (
                  _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092][
                    _0x54d98d(0xf4)
                  ] != !![]
                ) {
                  let _0x229c1d =
                    _0x54d98d(0x121) +
                    _0x5ced47["getName"](
                      _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"]
                    ) +
                    _0x54d98d(0x102) +
                    emoji_role(_0x54d98d(0x109)) +
                    _0x54d98d(0xe9) +
                    _0x4edbe4 +
                    "\x0a\x0aKetik\x20*.wwpc\x20dreamy\x20nomor*\x20untuk\x20melihat\x20role\x20player";
                  await _0x5ced47[_0x54d98d(0xde)](
                    _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"],
                    { text: _0x229c1d, mentions: _0x5a8ac3 }
                  );
                }
              } else {
                if (
                  _0x2a43af[_0x96aff2]["player"][_0x174092]["role"] ===
                  "guardian"
                ) {
                  if (
                    _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092][
                      _0x54d98d(0xf4)
                    ] != !![]
                  ) {
                    let _0x59bd0f =
                      _0x54d98d(0x121) +
                      _0x5ced47[_0x54d98d(0xdf)](
                        _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"]
                      ) +
                      "\x20Kamu\x20terpilih\x20untuk\x20memerankan\x20*Malaikat\x20Pelindung*\x20" +
                      emoji_role(_0x54d98d(0x112)) +
                      _0x54d98d(0x11a) +
                      _0x4edbe4 +
                      _0x54d98d(0x100);
                    await _0x5ced47[_0x54d98d(0xde)](
                      _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"],
                      { text: _0x59bd0f, mentions: _0x5a8ac3 }
                    );
                  }
                } else {
                  if (
                    _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092][
                      _0x54d98d(0x130)
                    ] === _0x54d98d(0x132)
                  ) {
                    if (
                      _0x2a43af[_0x96aff2]["player"][_0x174092][
                        _0x54d98d(0xf4)
                      ] != !![]
                    ) {
                      let _0x4ca4fa =
                        _0x54d98d(0x121) +
                        _0x5ced47[_0x54d98d(0xdf)](
                          _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092][
                            "id"
                          ]
                        ) +
                        _0x54d98d(0x11f) +
                        emoji_role(_0x54d98d(0x132)) +
                        _0x54d98d(0x11e) +
                        _0xa63892 +
                        _0x54d98d(0x12d);
                      await _0x5ced47[_0x54d98d(0xde)](
                        _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x174092]["id"],
                        { text: _0x4ca4fa, mentions: _0x5a8ac3 }
                      );
                    }
                  }
                }
              }
            }
          }
        }
        await _0x5ced47[_0x54d98d(0xde)](_0x3af77f[_0x54d98d(0xfb)], {
          text: "*⌂\x20W\x20E\x20R\x20E\x20W\x20O\x20L\x20F\x20-\x20G\x20A\x20M\x20E*\x0a\x0aGame\x20telah\x20dimulai,\x20para\x20player\x20akan\x20memerankan\x20perannya\x20masing\x20masing,\x20silahkan\x20cek\x20chat\x20pribadi\x20untuk\x20melihat\x20role\x20kalian.\x20Berhati-hatilah\x20para\x20warga,\x20mungkin\x20malam\x20ini\x20adalah\x20malah\x20terakhir\x20untukmu",
          contextInfo: {
            externalAdReply: {
              title: _0x54d98d(0xda),
              mediaType: 0x1,
              renderLargerThumbnail: !![],
              thumbnail: await resize(thumb, 0x12c, 0xaf),
              sourceUrl: "",
              mediaUrl: thumb,
            },
            mentionedJid: _0x5a8ac3,
          },
        }),
          await run(_0x5ced47, _0x96aff2, _0x2a43af);
      } else {
        if (_0x50605d === _0x54d98d(0x125)) {
          if (!_0x2a43af[_0x96aff2])
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x107));
          if (_0x2a43af[_0x96aff2][_0x54d98d(0x10b)] === ![])
            return _0x3af77f["reply"]("Sesi\x20permainan\x20belum\x20dimulai");
          if (_0x2a43af[_0x96aff2][_0x54d98d(0xf6)] !== "voting")
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x117));
          if (playerOnRoom(_0x504399, _0x96aff2, _0x2a43af) === ![])
            return _0x3af77f[_0x54d98d(0x12f)]("Kamu\x20bukan\x20player");
          if (dataPlayer(_0x504399, _0x2a43af)["isdead"] === !![])
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xf3));
          if (!_0x267cb4 || _0x267cb4[_0x54d98d(0xf2)] < 0x1)
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x122));
          if (isNaN(_0x267cb4)) return _0x3af77f["reply"](_0x54d98d(0xdb));
          if (dataPlayer(_0x504399, _0x2a43af)["isvote"] === !![])
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xe8));
          _0x749d49 = getPlayerById(
            _0x96aff2,
            _0x504399,
            parseInt(_0x267cb4),
            _0x2a43af
          );
          if (_0x749d49["db"][_0x54d98d(0xf4)] === !![])
            return _0x3af77f["reply"](
              "Player\x20" + _0x267cb4 + _0x54d98d(0xe1)
            );
          if (_0x2a43af[_0x96aff2]["player"]["length"] < parseInt(_0x267cb4))
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xfd));
          if (
            getPlayerById(
              _0x96aff2,
              _0x504399,
              parseInt(_0x267cb4),
              _0x2a43af
            ) === ![]
          )
            return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x10a));
          return (
            vote(_0x96aff2, parseInt(_0x267cb4), _0x504399, _0x2a43af),
            _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x133))
          );
        } else {
          if (_0x50605d == "exit") {
            if (!_0x2a43af[_0x96aff2])
              return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xe0));
            if (playerOnRoom(_0x504399, _0x96aff2, _0x2a43af) === ![])
              return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xe3));
            if (_0x2a43af[_0x96aff2]["status"] === !![])
              return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x12e));
            _0x3af77f[_0x54d98d(0x12f)](
              "@" + _0x504399[_0x54d98d(0x101)]("@")[0x0] + _0x54d98d(0xe4),
              { withTag: !![] }
            ),
              playerExit(_0x96aff2, _0x504399, _0x2a43af);
          } else {
            if (_0x50605d === _0x54d98d(0x10c)) {
              if (!_0x2a43af[_0x96aff2])
                return _0x3af77f["reply"](_0x54d98d(0xe0));
              if (_0x2a43af[_0x96aff2][_0x54d98d(0xe7)] !== _0x504399)
                return _0x3af77f[_0x54d98d(0x12f)](
                  "Hanya\x20@" +
                    _0x2a43af[_0x96aff2][_0x54d98d(0xe7)][_0x54d98d(0x101)](
                      "@"
                    )[0x0] +
                    "\x20yang\x20dapat\x20menghapus\x20sesi\x20permainan\x20ini"
                );
              _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xff))[_0x54d98d(0x11b)](
                () => {
                  delete _0x2a43af[_0x96aff2];
                }
              );
            } else {
              if (_0x50605d === "player") {
                if (!_0x2a43af[_0x96aff2])
                  return _0x3af77f["reply"](_0x54d98d(0xe0));
                if (playerOnRoom(_0x504399, _0x96aff2, _0x2a43af) === ![])
                  return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0xe3));
                if (_0x2a43af[_0x96aff2]["player"]["length"] === 0x0)
                  return _0x3af77f[_0x54d98d(0x12f)](_0x54d98d(0x114));
                let _0x8d110c = [],
                  _0xdf0934 = _0x54d98d(0xea);
                for (
                  let _0x178a1b = 0x0;
                  _0x178a1b <
                  _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x54d98d(0xf2)];
                  _0x178a1b++
                ) {
                  (_0xdf0934 +=
                    "(" +
                    _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x178a1b][
                      "number"
                    ] +
                    ")\x20@" +
                    _0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x178a1b]["id"][
                      _0x54d98d(0x108)
                    ](_0x54d98d(0xdc), "") +
                    "\x20" +
                    (_0x2a43af[_0x96aff2][_0x54d98d(0x123)][_0x178a1b][
                      "isdead"
                    ] === !![]
                      ? _0x54d98d(0x113) +
                        _0x2a43af[_0x96aff2]["player"][_0x178a1b]["role"]
                      : "") +
                    "\x0a"),
                    _0x8d110c[_0x54d98d(0xf7)](
                      _0x2a43af[_0x96aff2]["player"][_0x178a1b]["id"]
                    );
                }
                _0x5ced47[_0x54d98d(0xde)](
                  _0x3af77f["chat"],
                  {
                    text: _0xdf0934,
                    contextInfo: {
                      externalAdReply: {
                        title: _0x54d98d(0xda),
                        mediaType: 0x1,
                        renderLargerThumbnail: !![],
                        thumbnail: await resize(thumb, 0x12c, 0xaf),
                        sourceUrl: "",
                        mediaUrl: thumb,
                      },
                      mentionedJid: _0x8d110c,
                    },
                  },
                  { quoted: _0x3af77f }
                );
              } else {
                let _0x214e35 =
                  "\x0a*ᴡᴇʀᴇᴡᴏʟғ\x20-\x20ɢᴀᴍᴇ*\x0a\x0aPermainan\x20Party\x20Yang\x20Berlangsung\x20Dalam\x20Beberapa\x20Putaran/ronde.\x20Para\x20Pemain\x20Dituntut\x20Untuk\x20Mencari\x20Seorang\x20Manusia\x20Serigala\x20Yang\x20Ada\x20Dipermainan.\x20Para\x20Pemain\x20Diberi\x20Waktu,\x20Peran,\x20Serta\x20Kemampuannya\x20Masing-masing\x20Untuk\x20Bermain\x20Permainan\x20Ini\x0a\x0a*🐺\x20ᴋᴀᴛᴀ\x20ᴘᴇʀɪɴᴛᴀʜ*\x0a";
                (_0x214e35 += _0x54d98d(0xeb)),
                  (_0x214e35 += _0x54d98d(0x111)),
                  (_0x214e35 += "\x20•\x20ww\x20start\x0a"),
                  (_0x214e35 += "\x20•\x20ww\x20exit\x0a"),
                  (_0x214e35 += "\x20•\x20ww\x20delete\x0a"),
                  (_0x214e35 += _0x54d98d(0x106)),
                  (_0x214e35 += _0x54d98d(0x10f)),
                  _0x5ced47[_0x54d98d(0xde)](
                    _0x3af77f[_0x54d98d(0xfb)],
                    {
                      text: _0x214e35[_0x54d98d(0xe2)](),
                      contextInfo: {
                        externalAdReply: {
                          title: _0x54d98d(0xda),
                          mediaType: 0x1,
                          renderLargerThumbnail: !![],
                          thumbnail: await resize(thumb, 0x12c, 0xaf),
                          sourceUrl: "",
                          mediaUrl: thumb,
                        },
                      },
                    },
                    { quoted: _0x3af77f }
                  );
              }
            }
          }
        }
      }
    }
  }
};
(handler[_0x2bfe11(0x127)] = [_0x2bfe11(0x10d)]),
  (handler["tags"] = [_0x2bfe11(0xec)]),
  (handler["command"] = /^(ww|werewolf)$/i),
  (handler["group"] = !![]);
function _0x3710() {
  const _0x32550a = [
    "\x0a\x0aKetik\x20*.wwpc\x20deff\x20nomor*\x20untuk\x20melindungi\x20player",
    "split",
    "\x20Kamu\x20telah\x20terpilih\x20\x20untuk\x20menjadi\x20*Penerawang*\x20",
    "read",
    "\x20pada\x20permainan\x20kali\x20ini,\x20silahkan\x20pilih\x20salah\x20satu\x20player\x20yang\x20ingin\x20kamu\x20makan\x20pada\x20malam\x20hari\x20ini\x0a*LIST\x20PLAYER*:\x0a",
    "malem",
    "\x20•\x20ww\x20player\x0a",
    "Belum\x20ada\x20sesi\x20permainan",
    "replace",
    "seer",
    "Player\x20tidak\x20terdaftar!",
    "status",
    "delete",
    "werewolf",
    "110120XNXXeb",
    "\x0aPermainan\x20ini\x20dapat\x20dimainkan\x20oleh\x205\x20sampai\x2015\x20orang.",
    "MIME_JPEG",
    "\x20•\x20ww\x20join\x0a",
    "guardian",
    "☠️\x20",
    "Sesi\x20permainan\x20belum\x20memiliki\x20player",
    "246KObHho",
    "2948420cGUKLH",
    "Sesi\x20voting\x20belum\x20dimulai",
    "*⌂\x20W\x20E\x20R\x20E\x20W\x20O\x20L\x20F\x20-\x20G\x20A\x20M\x20E*\x0a\x0aHai\x20",
    "Kamu\x20masih\x20dalam\x20sesi\x20game",
    ",\x20dengan\x20kekuatan\x20yang\x20kamu\x20miliki,\x20kamu\x20bisa\x20melindungi\x20para\x20warga,\x20silahkan\x20pilih\x20salah\x201\x20player\x20yang\x20ingin\x20kamu\x20lindungi\x0a*LIST\x20PLAYER*:\x0a",
    "then",
    "Kamu\x20sudah\x20join\x20dalam\x20room\x20ini",
    "join",
    ",\x20dengan\x20kekuasaan\x20yang\x20kamu\x20punya,\x20kamu\x20bisa\x20membuka\x20identitas\x20para\x20player,\x20silakan\x20pilih\x201\x20orang\x20yang\x20ingin\x20kamu\x20buka\x20identitasnya\x0a*LIST\x20PLAYER*:\x0a",
    "\x20Kamu\x20terpilih\x20sebagai\x20Penyihir\x20",
    "https://telegra.ph/file/0b919778c2428e5925c5c.jpg",
    "Hai\x20",
    "Masukan\x20nomor\x20player",
    "player",
    ")\x20@",
    "vote",
    "Maaf\x20jumlah\x20player\x20belum\x20memenuhi\x20syarat",
    "help",
    "pagi",
    "number",
    ",\x20tetap\x20waspada,\x20mungkin\x20*Werewolf*\x20akan\x20memakanmu\x20malam\x20ini,\x20silakan\x20masuk\x20kerumah\x20masing\x20masing.\x0a*LIST\x20PLAYER*:\x0a",
    "warga",
    "723624tRVmXw",
    "\x0a\x0aKetik\x20*.wwpc\x20sorcerer\x20nomor*\x20untuk\x20melihat\x20role\x20player",
    "Permainan\x20sudah\x20dimulai,\x20kamu\x20tidak\x20bisa\x20keluar",
    "reply",
    "role",
    "103271XlYner",
    "sorcerer",
    "✅\x20Sukses\x20Melakukan\x20Voting",
    "W\x20E\x20R\x20E\x20W\x20O\x20L\x20F",
    "Gunakan\x20hanya\x20nomor",
    "@s.whatsapp.net",
    "Created\x20By\x20FanzOffc",
    "sendMessage",
    "getName",
    "Tidak\x20ada\x20sesi\x20permainan",
    "\x20sudah\x20mati.",
    "trim",
    "Kamu\x20tidak\x20dalam\x20sesi\x20permainan",
    "\x20Keluar\x20dari\x20permainan",
    "Room\x20belum\x20memiliki\x20player",
    "166207dhvKfp",
    "owner",
    "Kamu\x20sudah\x20melakukan\x20voting",
    ".\x20Dengan\x20sihir\x20yang\x20kamu\x20punya,\x20kamu\x20bisa\x20mengetahui\x20peran\x20pemain\x20pilihanmu.\x0a*LIST\x20PLAYER*:\x0a",
    "\x0a*⌂\x20W\x20E\x20R\x20E\x20W\x20O\x20L\x20F\x20-\x20G\x20A\x20M\x20E*\x0a\x0aLIST\x20PLAYER:\x0a",
    "\x20•\x20ww\x20create\x0a",
    "game",
    "start",
    "27xbKORN",
    "Hanya\x20@",
    "Sesi\x20permainan\x20telah\x20dimulai",
    "\x20Peran\x20kamu\x20adalah\x20*Warga\x20Desa*\x20",
    "length",
    "Kamu\x20sudah\x20mati",
    "isdead",
    "1274394iaAtIn",
    "time",
    "push",
    "2382208fTFruV",
    "\x0aJumlah\x20player\x20minimal\x20adalah\x205\x20dan\x20maximal\x2015",
    "resize",
    "chat",
    "create",
    "Invalid",
    "cooldown",
    "Sesi\x20permainan\x20berhasil\x20dihapus",
  ];
  _0x3710 = function () {
    return _0x32550a;
  };
  return _0x3710();
}
export default handler;
