import { Montserrat } from 'next/font/google'
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "OM Retirement",
  description: "Invest in your future & get your tax back for that holiday",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-dotted-spacing-[25px] bg-dotted-gray-300`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}