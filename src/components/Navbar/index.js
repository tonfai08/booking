import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";

const sections = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Contributors", id: "contributors" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // เปลี่ยนพื้นหลังเมื่อ scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ไฮไลท์เมนูตาม section ที่เห็นอยู่ ด้วย IntersectionObserver
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px", // โฟกัสช่วงกลางจอ
        threshold: 0.01,
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // เลื่อนไปยัง section และชดเชยความสูง header
  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector(".header-logo");
    const offset = header ? header.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`header-logo ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#home" className="logo" onClick={handleNavClick("home")}>
          <img src="/images/logo.png" alt="Logo" />
        </a>

        <ul className="menu desktop">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={handleNavClick(s.id)}
                className={active === s.id ? "active" : ""}
              >
                {s.label}
              </a>
            </li>
          ))}
           <li key={'tracking'}>
              <a
                href={`https://order-detail-eight.vercel.app/check-order`}
                className={"btn-status"}
              >
                {'Tracking Status'}
              </a>
            </li>
        </ul>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <ul className="menu mobile" onClick={() => setOpen(false)}>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={handleNavClick(s.id)}
                className={active === s.id ? "active" : ""}
              >
                {s.label}
              </a>
            </li>
          ))}
           <li key={'tracking'}>
              <a
                href={`https://order-detail-eight.vercel.app/check-order`}
                className={"btn-status"}
              >
                {'Tracking Status'}
              </a>
            </li>
        </ul>
      </div>
    </nav>
  );
}
