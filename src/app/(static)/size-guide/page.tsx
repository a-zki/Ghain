import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Size Guide',
}

const topsSizes = [
  { size: 'XS', chest: '82-86', waist: '66-70', hips: '88-92' },
  { size: 'S', chest: '87-91', waist: '71-75', hips: '93-97' },
  { size: 'M', chest: '92-96', waist: '76-80', hips: '98-102' },
  { size: 'L', chest: '97-101', waist: '81-85', hips: '103-107' },
  { size: 'XL', chest: '102-106', waist: '86-90', hips: '108-112' },
  { size: 'XXL', chest: '107-112', waist: '91-96', hips: '113-118' },
]

const bottomsSizes = [
  { size: 'XS', waist: '66-70', hips: '88-92', inseam: '76' },
  { size: 'S', waist: '71-75', hips: '93-97', inseam: '78' },
  { size: 'M', waist: '76-80', hips: '98-102', inseam: '79' },
  { size: 'L', waist: '81-85', hips: '103-107', inseam: '80' },
  { size: 'XL', waist: '86-90', hips: '108-112', inseam: '81' },
  { size: 'XXL', waist: '91-96', hips: '113-118', inseam: '82' },
]

const footwearSizes = [
  { eu: '39', us: '6.5', uk: '6', cm: '24.5' },
  { eu: '40', us: '7.5', uk: '7', cm: '25.5' },
  { eu: '41', us: '8', uk: '7.5', cm: '26' },
  { eu: '42', us: '9', uk: '8.5', cm: '27' },
  { eu: '43', us: '10', uk: '9.5', cm: '27.5' },
  { eu: '44', us: '10.5', uk: '10', cm: '28.5' },
  { eu: '45', us: '11.5', uk: '11', cm: '29' },
]

const thClass =
  'text-left text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b'
const tdClass = 'py-3 border-b border-neutral-100'
const tdFirstClass = 'py-3 border-b border-neutral-100 font-medium'

export default function SizeGuidePage() {
  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Size Guide' },
        ]}
      />

      <div className="mt-6 mb-12">
        <h1 className="font-display text-3xl font-light tracking-tight">
          Size Guide
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          All measurements are in centimeters. If you are between sizes, we
          recommend sizing up for a relaxed fit or down for a more tailored
          look.
        </p>
      </div>

      <div className="max-w-3xl pb-16 space-y-16">
        {/* How to Measure */}
        <section>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-6">
            How to Measure
          </h2>
          <ul className="text-sm text-neutral-600 space-y-3">
            <li>
              <span className="font-medium">Chest:</span> Measure around the
              fullest part of your chest, keeping the tape level under your
              arms.
            </li>
            <li>
              <span className="font-medium">Waist:</span> Measure around your
              natural waistline, the narrowest part of your torso.
            </li>
            <li>
              <span className="font-medium">Hips:</span> Measure around the
              fullest part of your hips, keeping the tape level.
            </li>
            <li>
              <span className="font-medium">Inseam:</span> Measure from the
              crotch seam to the bottom of the leg along the inner seam.
            </li>
            <li>
              <span className="font-medium">Foot length:</span> Stand on a
              piece of paper, mark the heel and longest toe, then measure the
              distance between the marks.
            </li>
          </ul>
        </section>

        {/* Tops */}
        <section>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-6">
            Tops
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={thClass}>Size</th>
                  <th className={thClass}>Chest (cm)</th>
                  <th className={thClass}>Waist (cm)</th>
                  <th className={thClass}>Hips (cm)</th>
                </tr>
              </thead>
              <tbody>
                {topsSizes.map((row) => (
                  <tr key={row.size}>
                    <td className={tdFirstClass}>{row.size}</td>
                    <td className={tdClass}>{row.chest}</td>
                    <td className={tdClass}>{row.waist}</td>
                    <td className={tdClass}>{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottoms */}
        <section>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-6">
            Bottoms
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={thClass}>Size</th>
                  <th className={thClass}>Waist (cm)</th>
                  <th className={thClass}>Hips (cm)</th>
                  <th className={thClass}>Inseam (cm)</th>
                </tr>
              </thead>
              <tbody>
                {bottomsSizes.map((row) => (
                  <tr key={row.size}>
                    <td className={tdFirstClass}>{row.size}</td>
                    <td className={tdClass}>{row.waist}</td>
                    <td className={tdClass}>{row.hips}</td>
                    <td className={tdClass}>{row.inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footwear */}
        <section>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-6">
            Footwear
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={thClass}>EU</th>
                  <th className={thClass}>US</th>
                  <th className={thClass}>UK</th>
                  <th className={thClass}>Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {footwearSizes.map((row) => (
                  <tr key={row.eu}>
                    <td className={tdFirstClass}>{row.eu}</td>
                    <td className={tdClass}>{row.us}</td>
                    <td className={tdClass}>{row.uk}</td>
                    <td className={tdClass}>{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
