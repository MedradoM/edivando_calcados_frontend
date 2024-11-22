type TMainEditorPage = React.PropsWithChildren<{}>;

const MainEditorPage = ({ children }: TMainEditorPage) => {
  return (
    <main className="pl-72 pr-16 pt-8 w-full h-full bg-slate-50">
      {children}
    </main>
  );
};

export default MainEditorPage;
