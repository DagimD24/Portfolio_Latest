import Navbar from '../Navbar';
import { ThemeProvider } from '../ThemeProvider';

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <Navbar onNavigate={(id) => console.log('Navigate to:', id)} />
    </ThemeProvider>
  );
}
