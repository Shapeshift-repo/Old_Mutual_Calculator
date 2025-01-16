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
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H2MLQMKQ3T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H2MLQMKQ3T');
            `,
          }}
        />
      </head>
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