import { StatusBar, Style } from "@capacitor/status-bar";

export async function setTheme(isDark: boolean) {
  if (isDark) {
    setDarkTheme();
  }else{
    setLightTheme();
  }
}

async function setDarkTheme(){
  document.body.classList.toggle("dark", true);
  try {
    await StatusBar.setBackgroundColor({ color: '#121212' });
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
    console.log("Error during setting status bar color");
  }
}

async function setLightTheme(){
  document.body.classList.toggle("dark", false);
  try {
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
    await StatusBar.setStyle({ style: Style.Light });
  } catch (e) {
    console.log("Error during setting status bar color");
  }
}
