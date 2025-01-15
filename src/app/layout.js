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
  description: "Secure your future, so that your children won`t have to when you retire.",
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