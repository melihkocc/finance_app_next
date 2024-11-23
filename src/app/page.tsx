import Container from "@/components/Container";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { getCookie } from "cookies-next"; 
import { cookies } from 'next/headers';

export default async function Home() {

  const token = await getCookie("token",{cookies})
  return (
    <Container>
      {
        token===undefined ? <div className="w-full flex justify-center items-center">
          <Link href={"/login"}>
            <div className="px-3 py-1 rounded-lg border text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all ease-out duration-300">
              Giriş Yap
            </div>
          </Link>
          <Link href={"/register"}>
            <div className="px-3 py-1 rounded-lg border text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all ease-out duration-300 ms-10">
              Kayıt Ol
            </div>
          </Link>
        </div>
          :
          <div className="w-full flex justify-center items-center">
            <Link href={"/dashboard"}>
              <div className="px-3 py-1 rounded-lg border text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all ease-out duration-300">
                Gelir Gider Sayfasına Git
              </div>
            </Link>
          </div>
      }
      <div className="w-full flex flex-col items-center justify-center bg-green-600 py-5 mt-10">
        <div className="text-2xl font-semibold text-white">Gelir - Gider Takip Uygulaması</div>
        <div className="font-medium mt-2 text-white text-center">Tüm tahsilatlar ve ödemeleriniz her an gözünüzün önünde!</div>
      </div>
      <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-10 px-20 mt-10">
        <div className="flex flex-col items-center">
          <FaWallet size={40} className="text-green-600" />
          <div className="text-lg">Gelir & Gider Takibi</div>
          <div className="text-center text-sm lg:w-2/3 w-11/12 mx-auto mt-3">Gelir ve Giderlerinizi taksitli, taksitsiz, alacak, ve borç gibi farklı türlerde kategori, fotoğraf, not ve konum seçerek kolayca ekleyebilir, düzenleyebilir ve takip edebilirsiniz.</div>
        </div>
        <div className="flex flex-col items-center">
          <FaChartBar size={40} className="text-green-600" />
          <div className="text-lg">Grafik ve Raporlar</div>
          <div className="text-center text-sm lg:w-2/3 w-11/12 mx-auto mt-3">Gelir ve Giderlerinizi detaylı grafiklerle görebilir, Excel ve pdf formatında detaylı raporlar indirebilirsiniz.</div>
        </div>
        <div className="flex flex-col items-center">
          <IoPersonSharp size={40} className="text-green-600" />
          <div className="text-lg">Kişiselleştirme</div>
          <div className="text-center text-sm lg:w-2/3 w-11/12 mx-auto mt-3">Detaylı ayarlar ile hesap dönemi ve uyarılarla ilgili Kişiselleştirmeler yapabilir , kişisel hatırlatmalar ekleyebilir ve bütçenize göre limitlerinize alarm ekleyebilirsiniz.</div>
        </div>
      </div>
    </Container>
  );
}
