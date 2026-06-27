import PageShell from "../components/PageShell.jsx";
import { useTranslation } from "../i18n/I18nContext.jsx";

export default function ComparePage() {
  const { t } = useTranslation();
  const rows = t("compare.table.rows");
  const roles = t("compare.roles.items");
  return (
    <PageShell activePage="compare">
      <main id="top" className="compare-page">
        <section className="compare-hero section" data-reveal>
          <div className="compare-hero-layout">
            <div className="compare-hero-copy">
              <span className="section-kicker">{t("nav.compare")}</span>
              <h1>{t("compare.hero.title")}</h1>
              <p>{t("compare.hero.desc")}</p>
            </div>
            <div className="compare-hero-stats">
              <div className="compare-hero-orbit">
                <div className="orbit-ring" />
                <div className="orbit-center" data-no-translate>
                  <span className="orbit-brand">YeneSchool</span>
                  <span>{t("compare.stats.subtitle")}</span>
                </div>
                <div className="orbit-track">
                  <div className="orbit-item" style={{ "--i": 0 }} data-label={t("compare.stats.items")[0]}>
                    <strong>52</strong>
                  </div>
                  <div className="orbit-item" style={{ "--i": 1 }} data-label={t("compare.stats.items")[1]}>
                    <strong>523+</strong>
                  </div>
                  <div className="orbit-item" style={{ "--i": 2 }} data-label={t("compare.stats.items")[2]}>
                    <strong>8</strong>
                  </div>
                  <div className="orbit-item" style={{ "--i": 3 }} data-label={t("compare.stats.items")[3]}>
                    <strong>5</strong>
                  </div>
                  <div className="orbit-item" style={{ "--i": 4 }} data-label={t("compare.stats.items")[4]}>
                    <strong>95</strong>
                  </div>
                  <div className="orbit-item" style={{ "--i": 5 }} data-label={t("compare.stats.items")[5]}>
                    <strong>6</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section compare-matrix" data-reveal>
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{t("compare.table.colFeature")}</th>
                  <th className="col-legacy">{t("compare.table.colLegacy")}</th>
                  <th className="col-local">{t("compare.table.colLocal")}</th>
                  <th className="col-yene">{t("compare.table.colYene")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="cell-feature">{row.feature}</td>
                    <td className="cell-legacy">{row.legacy}</td>
                    <td className="cell-local">{row.local}</td>
                    <td className="cell-yene">{row.yene}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section compare-roles" data-reveal>
          <h2>{t("compare.roles.title")}</h2>
          <p className="compare-roles-desc">{t("compare.roles.desc")}</p>
          <div className="compare-roles-grid">
            {roles.map((item) => (
              <article key={item.name} className="compare-role-card">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
