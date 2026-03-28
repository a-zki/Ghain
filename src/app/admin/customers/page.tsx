import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDate } from '@/lib/utils/formatDate'

type MockCustomer = {
  id: string
  name: string
  email: string
  ordersCount: number
  totalSpent: number
  joinedDate: string
}

const mockCustomers: MockCustomer[] = [
  {
    id: 'cust-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    ordersCount: 8,
    totalSpent: 1245.0,
    joinedDate: '2025-09-15T10:00:00Z',
  },
  {
    id: 'cust-002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    ordersCount: 5,
    totalSpent: 890.0,
    joinedDate: '2025-10-02T10:00:00Z',
  },
  {
    id: 'cust-003',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    ordersCount: 12,
    totalSpent: 2340.0,
    joinedDate: '2025-08-20T10:00:00Z',
  },
  {
    id: 'cust-004',
    name: 'James Park',
    email: 'james.park@email.com',
    ordersCount: 3,
    totalSpent: 475.0,
    joinedDate: '2025-12-10T10:00:00Z',
  },
  {
    id: 'cust-005',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@email.com',
    ordersCount: 7,
    totalSpent: 1560.0,
    joinedDate: '2025-11-05T10:00:00Z',
  },
  {
    id: 'cust-006',
    name: 'Liam Nguyen',
    email: 'liam.nguyen@email.com',
    ordersCount: 2,
    totalSpent: 350.0,
    joinedDate: '2026-01-18T10:00:00Z',
  },
]

export default function AdminCustomersPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-light">Customers</h2>
      </div>

      <div className="bg-white border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Name
              </th>
              <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Email
              </th>
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Orders
              </th>
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Total Spent
              </th>
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors duration-100"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
                      {customer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm font-medium">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <Badge variant="outline">{customer.ordersCount}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  {formatCurrency(customer.totalSpent)}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-500 text-right">
                  {formatDate(customer.joinedDate, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
