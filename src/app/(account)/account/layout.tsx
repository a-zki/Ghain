import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { AccountSidebar } from '@/components/account/AccountSidebar'
import { AccountMobileTabs } from '@/components/account/AccountMobileTabs'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageContainer className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account' },
        ]}
        className="mb-6"
      />
      <h1 className="font-display text-3xl font-light tracking-tight mb-8">
        My Account
      </h1>

      <AccountMobileTabs />

      <div className="flex gap-12 mt-6 md:mt-0">
        <div className="hidden md:block">
          <AccountSidebar />
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </PageContainer>
  )
}
