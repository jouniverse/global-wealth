// Table 1-1: Wealth coverage
let coverage = {
  number: [29, 24, 118, 46],
  cumulatedPctOfPopulation: [54.9, 63.8, 95.1, 100],
  cumulatedPctOfTotalWealth: [87.8, 93.4, 99.1, 100],
};

//  Table 1-2: Household data sources
let householdDataSources = {
  market: [
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "Chile",
    "Mainland China",
    "Colombia",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "India",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Kazakhstan",
    "Korea",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "United Kingdom",
    "United States",
  ],
  financial_data: [
    "Australian Bureau of Statistics",
    "OECD and Oesterreichische Nationalbank",
    "OECD and Bank of Belgium",
    "OECD",
    "OECD and Bank of Bulgaria",
    "Statistics Canada",
    "Chile Central Bank",
    "Piketty et al. (2018)",
    "Colombia Central Bank",
    "Eurostat Financial Balance Sheets",
    "Eurostat Financial Balance Sheets",
    "OECD and Czech National Bank (CNB)",
    "Eurostat Financial Balance Sheets and Statistics Denmark",
    "OECD and Bank of Estonia",
    "OECD and Statistics Finland",
    "OECD and Banque de France",
    "OECD, Eurostat Financial Balance Sheets and Bundesbank",
    "Eurostat Financial Balance Sheets and Bank of Greece",
    "Eurostat Financial Balance Sheets and Hungarian Central Bank",
    "Malhotra (2021)",
    "OECD and Eurostat Financial Balance Sheets and Central Bank of Ireland",
    "OECD",
    "Bank of Italy and Eurostat Financial Balance Sheets",
    "OECD and Bank of Japan",
    "Unicredit: CEE Households’ Wealth and Debt Monitor",
    "OECD and Bank of Korea",
    "Eurostat Financial Balance Sheets",
    "Eurostat Financial Balance Sheets",
    "OECD and Banque Central du Luxembourg",
    "OECD and Bank of Malta",
    "OECD",
    "OECD and Statistics Netherlands",
    "New Zealand Reserve Board",
    "OECD and Statistics Norway",
    "OECD and National Bank of Poland",
    "Eurostat Financial Balance Sheets and Banco de Portugal",
    "Eurostat Financial Balance Sheets",
    "Unicredit: CEE Households’ Wealth and Debt Monitor and Central Bank of the Russian Federation",
    "Singapore Department of Statistics",
    "OECD and Národná banka Slovenska",
    "OECD and Eurostat Financial Balance Sheets",
    "OECD and South African Reserve Bank",
    "Bank of Spain",
    "Eurostat Financial Balance Sheets and Sveriges Riksbank",
    "OECD and Swiss National Bank",
    "Flow of Funds, (Taiwan),Central Bank of China",
    "IMF Global Financial Stability Report 2006, Chapter 2",
    "Unicredit: CEE Households’ Wealth and Debt Monitor and Central Bank of the Republic of Turkey",
    "OECD, Eurostat Financial Balance Sheets and Office for National Statistics",
    "OECD and Federal Reserve Board (FRB) Flow of Funds Accounts, Table B.101.h",
  ],
  non_financial_data: [
    "Australian Bureau of Statistics",
    "n.a.",
    "n.a.",
    "n.a.",
    "n.a.",
    "Statistics Canada",
    "n.a.",
    "Piketty et al. (2019)",
    "n.a.",
    "n.a.",
    "n.a.",
    "OECD and CNB",
    "Statistics Denmark",
    "n.a.",
    "Statistics Finland",
    "OECD",
    "OECD",
    "WID ",
    "OECD",
    "n.a.",
    "n.a.",
    "OECD",
    "Bank of Italy and OECD",
    "OECD",
    "n.a.",
    "OECD",
    "n.a.",
    "n.a.",
    "n.a.",
    "n.a.",
    "OECD",
    "OECD",
    "OECD",
    "n.a.",
    "n.a.",
    "n.a.",
    "n.a.",
    "n.a.",
    "Singapore Department of Statistics",
    "n.a.",
    "n.a.",
    "Same as for financial data",
    "Bank of Spain",
    "Sveriges Riksbank",
    "OECD",
    "Central Bank of China",
    "n.a.",
    "n.a.",
    "OECD",
    "Same as for financial data",
  ],
  financial_and_non_financial_data_compiled_by: [
    "Australian Bureau of Statistics",
    "n.a.",
    " n.a.",
    "n.a.",
    "n.a.",
    " Statistics Canada",
    "n.a.",
    "Piketty et al. (2019)",
    "n.a.",
    "n.a.",
    " n.a.",
    "Authors",
    "Authors",
    "n.a.",
    "Authors.",
    "Authors",
    "Authors",
    "Authors",
    "Authors",
    "n.a.",
    "n.a.",
    "Authors",
    " Authors",
    "Authors",
    " n.a.",
    "Authors",
    " n.a.",
    " n.a.",
    " n.a.",
    "n.a.",
    "Authors",
    "Authors",
    " Authors",
    " n.a.",
    " n.a.",
    "n.a.",
    "n.a.",
    "n.a.",
    "Singapore Department of Statistics",
    "n.a.",
    "n.a.",
    "Authors",
    "Authors",
    "Authors",
    "Authors",
    "Central Bank of China",
    "n.a.",
    "n.a.",
    "Authors",
    "Authors",
  ],
  link_to_open_acces_data: [
    `<a href="https://www.abs.gov.au">www.abs.gov.au</a>`,
    `<a href="https://stats.oecd.org//">stats.oecd.org</a>;<a href="https://www.oenb.at">www.oenb.at</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>`,
    `<a href="https://www.statcan.gc.ca">www.statcan.gc.ca</a>`,
    `<a href="https://www.bcentral.cl">www.bcentral.cl</a>`,
    `<a href="https://http://gabriel-zucman.eu/china/">http://gabriel-zucman.eu/china/</a>`,
    `<a href="https://www.banrep.gov.co">www.banrep.gov.co</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.cnb.cz">www.cnb.cz</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>;<a href="https://www.statbank.dk">www.statbank.dk</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.eestipank.info">www.eestipank.info</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href=""https://www.stat.fi>www.stat.fi</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href=""https://www.banque-france.fr>www.banque-france.fr</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>;<a href="https://www.wid.world">www.wid.world</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>;<a href="https://english.mnb.hu/">english.mnb.hu/</a>`,
    `<a href="https://https://dataverse.harvard.edu/dataset.xhtml?persisteId=doi:10.7910/DVN/DPQPJY">https://dataverse.harvard.edu/dataset.xhtml?persisteId=doi:10.7910/DVN/DPQPJY</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>;<a href="https://www.centralbank.ie">www.centralbank.ie</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>`,
    `<a href="https://www.bacaditalia.it">www.bacaditalia.it</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.boj.or.jp">www.boj.or.jp</a>`,
    `n.a.`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.bok.or.kr">www.bok.or.kr</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.bcl.lu">www.bcl.lu</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.cbs.nl">www.cbs.nl</a>`,
    `<a href="https://www.rbnz.govt.nz">www.rbnz.govt.nz</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.ssb.no">www.ssb.no</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https://www.nbp.pl">www.nbp.pl</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>; <a href="https://www.bportugal.pt">www.bportugal.pt</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://www.cbr.ru">www.cbr.ru</a>`,
    `<a href="https://www.singstat.gov.sg">www.singstat.gov.sg</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>; <a href="https//www.nbs.sk">www.nbs.sk</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>;<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://www.reservebank.co.za">www.reservebank.co.za</a>`,
    `<a href="https://www.bde.es">www.bde.es</a>`,
    `<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>;<a href="https://www.riksbank.com">www.riksbank.com</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>;<a href="https://www.snb.ch">www.snb.ch</a>`,
    `<a href="https://eng.stat.gov.tw">eng.stat.gov.tw</a>`,
    `n.a.`,
    `<a href="https://www.tcmb.gov.tr">www.tcmb.gov.tr</a>`,
    `<a href="https://stats.oecd.org">stats.oecd.org</a>;<a href="https://www.statistics.gov.uk">www.statistics.gov.uk</a>;<a href="https://ec.europa.eu/eurostat">ec.europa.eu/eurostat</a>`,
    `<a href="https://www.federalreserve.gov">www.federalreserve.gov</a>`,
  ],
};

// Table 1-3: Survey sources
let surveyDataSources = {
  market: [
    "Australia",
    "Austria",
    "Austria",
    "Belgium",
    "Belgium",
    "Canada",
    "Chile",
    "Chile",
    "China",
    "Colombia",
    "Cyprus",
    "Denmark",
    "Estonia",
    "Finland",
    "Finland",
    "France",
    "France",
    "Germany",
    "Greece",
    "Greece",
    "Hungary",
    "India",
    "India",
    "Indonesia",
    "Ireland",
    "Italy",
    "Italy",
    "Italy",
    "Japan",
    "Japan",
    "Korea",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Portugal",
    "Slovakia",
    "Slovakia",
    "Slovenia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Sweden",
    "Switzerland",
    "Thailand",
    "United Kingdom",
    "United Kingdom",
    "United States",
    "United States",
    "Uruguay",
  ],
  year: [
    "2003/2005/2009/2011-2018",
    "2010/2011",
    "2014/2017",
    "2010/2011",
    "2014/2017",
    "2005/2012/2016/2019",
    "2007/2011",
    "2014/2017",
    "2002/2013",
    "2018",
    "2010",
    "2000-2012",
    "2013/2017",
    "2004/2009/2010",
    "2013/2016/2019",
    "2009",
    "2000-2014/2017",
    "2003/2008/2013/2017/2018",
    "2009",
    "2014/2018",
    "2014/2017",
    "2002",
    "2012",
    "2014",
    "2013/2018",
    "2000/2002",
    "2008/2010/2011",
    "2014/2016",
    "2009",
    "2014/2019",
    "2011-2018",
    "2014/17",
    "2017",
    "2010/2011/2014/2018",
    "2010",
    "2019",
    "2006-2020",
    "2001",
    "2014/2105/2018",
    "2004/2010-2019",
    "2014/2016",
    "2010",
    "2013/2017",
    "2010",
    "2014",
    "2010",
    "2014",
    "2008/2009/2011/2012/2014/2017/2018",
    "2002",
    "2007",
    "2003-2014",
    "2006",
    "2000",
    "2008/2009/2011/2013/2014/2015/2017",
    "2001-2019",
    "2000-2021",
    "2013",
  ],
  source: [
    "Survey of Income and Housing; see Australian Bureau of Statistics (2015).",
    "Eurosystems Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Survey of Financial Security; Statistics Canada (microdata)",
    "Encuesta Financiera de Hogares; Central Bank of Chile (microdata)",
    "Encuesta Financiera de Hogares; Central Bank of Chile, see Sanroman and Santos (2017).",
    "China Household Income Project, see Knight, Li and Wan (2016).",
    "Encuesta de Carga Financiera y Educación Financiera de los Hogares (IEFIC microdata)",
    "Eurosystem Household Finance and Consumption Survey (HFCS)",
    "Andersen et al. (2022)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Socio-Economic Panel (SOEP); Grabka and Westermeir (2014) and private communication.",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "All-India Debt and Investment Survey (NSS 59th round); see National Sample Survey Organization (2005) and Subramanian and Jayaraj (2008).",
    "All-India Debt and Investment Survey (NSS 70th round) (microdata)",
    "Indonesia Family Life Survey (microdata)",
    "Eurosystem Household Finance and Consumption Survey; see Staunton (2015)",
    "Survey of Household Income and Wealth (SHIW); see Mazzaferro (2009)",
    "Survey of Household Income and Wealth (SHIW) (microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "National Survey of Family Income and Expenditure; Statistics Japan",
    "National Survey of Family Income and Expenditure; Statistics Japan, see OECD.Stat (n.d.).",
    "Survey of Household Finances; Korean Statistical Information Service, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Encuesta Nacional sobre las Finanzas de los Hogares (ENFIH microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Household Saving Survey; see Statistics New Zealand (2002).",
    "Income Statistics for Households; Statistics New Zealand, see OECD.Stat (n.d.)",
    "Norwegian Income and Wealth Statistics for Households; Statistics Norway, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.).",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.)",
    "Eurosystem Household Finance and Consumption Survey (HFCS microdata)",
    "Eurosystem Household Finance and Consumption Survey, see OECD.Stat (n.d.)",
    "Survey of Household Finances; Bank of Spain (microdata)",
    "Wealth Survey (HINK); Statistics Sweden, see Davies et al. (2011)",
    "Wealth statistics based on registers of total population; see Statistics Sweden (2007).",
    "Fluder and Jann (2014), updated in private correspondence;",
    "2006 Socioeconomic Survey; see Ariyapruchya et al (2008).",
    "British Household Panel Survey; ESRC, see Sierminska et al ((2006)",
    "Wealth and Asset Survey; UK Office for National Statistics (microdata)",
    "Survey of Consumer Finances; Federal Reserve Board (microdata)",
    "Distributional Financial Accounts; Federal Reserve Board (2021)",
    "Encuesta Financiera de Hogares Uruguayos (EFHU); Bank of Uruguay (microdata)",
  ],
};
