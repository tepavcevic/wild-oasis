import DashboardLayout from '#/features/dashboard/DashboardLayout';
import DashboardFilter from '#/features/dashboard/DashboardFilter';
import Heading from '#/ui/Heading';
import Row from '#/ui/Row';
import { requireAuthenticatedUser } from '#/services/authGuards';

export async function clientLoader() {
  await requireAuthenticatedUser();
  return null;
}

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
