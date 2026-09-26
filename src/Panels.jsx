import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Panels.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PANELS = [
  {
    id: 'home',
    index: '01',
    label: 'Flame-Grilled',
    heading: ['Smashed. Stacked.', 'Still dripping.'],
    image: '/burger2.jpeg',
  },
  {
    id: 'menu',
    index: '02',
    label: 'The Menu',
    heading: ['Burgers, loaded sides,', 'built for round two.'],
    image: '/split.jfif',
  },
  {
    id: 'locations',
    index: '03',
    label: 'Locations',
    heading: ['Three flat-tops.', 'Zero shortcuts.'],
  },
  {
    id: 'order',
    index: '04',
    label: 'Order',
    heading: ['Skip the line.', 'Order ahead.'],
    cta: { label: 'Order Now', href: '#order' },
  },
]

function Panels() {
  const container = useRef(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray('.panel')

      panels.forEach((panel) => {
        const lines = panel.querySelectorAll('.panel-mask-line')
        const meta = panel.querySelectorAll('.panel-meta > *')

        gsap.set(lines, { yPercent: 110 })
        gsap.set(meta, { opacity: 0, y: 12 })

        ScrollTrigger.create({
          trigger: panel,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(meta, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
            })
            gsap.to(lines, {
              yPercent: 0,
              duration: 0.9,
              ease: 'power4.out',
              stagger: 0.08,
              delay: 0.1,
            })
          },
        })
      })
    },
    { scope: container }
  )

  return (
    <div ref={container}>
      {PANELS.map((panel) => (
        <section
          key={panel.id}
          id={panel.id}
          className="panel"
          style={
            panel.image ? { backgroundImage: `url(${panel.image})` } : undefined
          }
        >
          <div className="panel-veil" />

          <div className="panel-meta">
            <span className="panel-index">{panel.index}</span>
            <span className="panel-label">{panel.label}</span>
          </div>

          <h2 className="panel-heading">
            {panel.heading.map((line) => (
              <span className="panel-mask" key={line}>
                <span className="panel-mask-line">{line}</span>
              </span>
            ))}
          </h2>

          {panel.cta && (
            <a href={panel.cta.href} className="panel-cta">
              {panel.cta.label}
            </a>
          )}
        </section>
      ))}
    </div>
  )
}

export default Panels
