del /s /q "C:\Users\exhibits\chromeData_temp"
copy "C:\Users\exhibits\chromeData" "C:\Users\exhibits\chromeData_temp\"


ping -n 30 127.0.0.1


start chrome --user-data-dir="C:\Users\exhibits\chromeData_temp" --kiosk "localhost\magicPlanet_futureEarth\index.html"