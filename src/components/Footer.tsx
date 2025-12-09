export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-serif text-xl mb-4 text-mist">ADIA</h3>
            <p className="text-sm text-mist/60 leading-relaxed">
              Asociatia de Dezvoltare Intelectuala si Arta
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-mist/70 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-mist/60">
              <li>Email: adia.asociatie@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-mist/70 mb-4">Urmareste-ne</h4>
            <ul className="space-y-2 text-sm text-mist/60">
              <li>
                <a href="https://www.facebook.com/profile.php?id=100087757591388" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/adia_asociatie_literart/" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-mist/50">
          <p>&copy; {new Date().getFullYear()} ADIA. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}

