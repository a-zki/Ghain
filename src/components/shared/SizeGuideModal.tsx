'use client'

import { Modal } from '@/components/ui/Modal'

type SizeGuideModalProps = {
  isOpen: boolean
  onClose: () => void
}

const sizeData = [
  { size: 'XS', chest: '82-86', waist: '66-70', hips: '88-92' },
  { size: 'S', chest: '87-91', waist: '71-75', hips: '93-97' },
  { size: 'M', chest: '92-96', waist: '76-80', hips: '98-102' },
  { size: 'L', chest: '97-101', waist: '81-85', hips: '103-107' },
  { size: 'XL', chest: '102-106', waist: '86-90', hips: '108-112' },
  { size: 'XXL', chest: '107-112', waist: '91-96', hips: '113-118' },
]

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Size Guide" size="md">
      <div className="mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b">
                Size
              </th>
              <th className="text-left text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b">
                Chest (cm)
              </th>
              <th className="text-left text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b">
                Waist (cm)
              </th>
              <th className="text-left text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b">
                Hips (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row) => (
              <tr key={row.size}>
                <td className="py-3 border-b border-neutral-100 font-medium">
                  {row.size}
                </td>
                <td className="py-3 border-b border-neutral-100">
                  {row.chest}
                </td>
                <td className="py-3 border-b border-neutral-100">
                  {row.waist}
                </td>
                <td className="py-3 border-b border-neutral-100">
                  {row.hips}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
            How to Measure
          </h3>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li>
              <span className="font-medium">Chest:</span> Measure around the
              fullest part of your chest, keeping the tape level under your arms.
            </li>
            <li>
              <span className="font-medium">Waist:</span> Measure around your
              natural waistline, the narrowest part of your torso.
            </li>
            <li>
              <span className="font-medium">Hips:</span> Measure around the
              fullest part of your hips, keeping the tape level.
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
