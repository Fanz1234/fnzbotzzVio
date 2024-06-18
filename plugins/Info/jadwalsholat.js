import { fetchJson } from '../../utils/fetcher.js';
import { toUpper } from '../../utils/helper.js';

export default {
	aliases: /^((jadwal)?s(h)?olat)$/i,
	description: 'mendapatkan infromasi jadwal sholat berdasarkan kota\n\nContoh : #jadwalsholat bandung',
	execute: async ({ m }) => {
		let date = new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jakarta' }).format(Date.now()).split('/').reverse().join('/');
		let idKota = await fetchJson(`https://api.myquran.com/v2/sholat/kota/cari/${m.text ? m.text : 'kab. blitar'}`);
		let data = await fetchJson(`https://api.myquran.com/v2/sholat/jadwal/${idKota.data[0]?.id}/${date}`);
		await m.reply({
			poll: {
				name: `Jadwal Sholat ${toUpper(data.data.daerah)} ${toUpper(data.data.lokasi)}\n\nPada ${data.data.jadwal.tanggal}`,
				selectableCount: 0,
				values: Object.entries(data.data.jadwal)
					.filter(v => !/date|tanggal/i.test(v[0]))
					.map(v => `${toUpper(v[0])} : ${v[1]} WIB`),
			},
		});
		// let data = await fetchJson(`https://api.aladhan.com/v1/timingsByCity/${date}?city=${m.text || 'Blitar'}&country=Indonesia&method=8`)
   },
   isWait: true,
	isLimit: 0.5,
	isTask: true,
};
