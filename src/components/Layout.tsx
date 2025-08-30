import Navigation from './Navigation';
import Footer from './Footer';
import AudioControls from './AudioControls';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-spooky">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <AudioControls />
    </div>
  );
};

export default Layout;