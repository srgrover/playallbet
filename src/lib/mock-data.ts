export interface Team {
  name: string;
  logoUrl: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  score: string;
  status: string;
}

export const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: { name: "Real Madrid", logoUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZe-AxGUsPMDOc1A_96x96.png" },
    awayTeam: { name: "FC Barcelona", logoUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png" },
    score: "3 - 2",
    status: "Finalizado",
  },
  {
    id: 2,
    homeTeam: { name: "Liverpool", logoUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png" },
    awayTeam: { name: "Man City", logoUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgP1Npd-Pw_96x96.png" },
    score: "1 - 1",
    status: "En vivo",
  },
  {
    id: 3,
    homeTeam: { name: "Vallecano", logoUrl: "/un-logo-que-no-existe.png" }, // URL incorrecta para probar el fallback
    awayTeam: { name: "Girona", logoUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/s4LdC_vI_VPv131P3i_p4g_96x96.png" },
    score: "vs",
    status: "Próximamente",
  },
  {
    id: 4,
    homeTeam: { name: "Betis", logoUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/S0fDZjYYytbZaUt0f3cIig_96x96.png" },
    awayTeam: { name: "Sevilla", logoUrl: "/otro-logo-roto.svg" }, // URL incorrecta para probar el fallback
    score: "vs",
    status: "Próximamente",
  },
];
