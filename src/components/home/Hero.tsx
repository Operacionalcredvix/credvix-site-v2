import { MapPin } from 'lucide-react'
import { CtaButton } from '../ui/CtaButton'
import styles from './Hero.module.css'

/**
 * Etapa 02: Hero exclusiva da Home.
 * A marca-modelo e um SVG original enviado pelo time Credvix.
 * O Header e o Footer permanecem compartilhados com as demais rotas.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className="cvx-shell">
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 id="home-hero-title" className={styles.title}>
              <span>CRÉDITO</span>
              <span>
                MAIS <strong>PRÓXIMO</strong>
              </span>
              <span>DE VOCÊ.</span>
            </h1>

            <p className={styles.description}>
              Na Credvix, acreditamos em ouvir, compreender e oferecer um atendimento
              personalizado. Conheça nossa atuação em crédito consignado e encontre
              uma unidade perto de você.
            </p>

            <div className={styles.actions}>
              <CtaButton to="/lojas" label="Encontrar uma loja" variant="amber" />

              <p className={styles.hint}>
                <MapPin size={19} strokeWidth={1.8} aria-hidden="true" />
                <span>O próximo passo pode começar em uma de nossas unidades.</span>
              </p>
            </div>
          </div>

          <img
            className={styles.artwork}
            src="/home/marca-modelo.svg"
            alt="Colaboradora da Credvix sorrindo, diante dos grafismos laranja da marca."
            width={691}
            height={703}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
