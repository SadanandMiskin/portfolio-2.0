const Footer = () => {
  return (
    <footer className="page-shell mt-auto py-7 text-center text-xs text-stone-500 dark:text-stone-500">
      <div className="border-t border-stone-950/10 pt-5 dark:border-stone-950/10">
        <p>Sadanand Miskin / {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
