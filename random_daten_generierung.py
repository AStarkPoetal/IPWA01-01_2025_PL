import pandas as pd
import random

# Szektorok és hozzájuk tartozó reális kibocsátási tartományok (tCO2e)
sectors = [
  ("Energie", "Kraftwerk", (15000000, 25000000)),    # nagy erőművek
  ("Stahl", "Stahlwerk", (8000000, 18000000)),       # acélművek
  ("Chemie", "Chemiewerk", (5000000, 12000000)),     # vegyipar
  ("Raffinerie", "Raffinerie", (3000000, 7000000)),  # olajfinomítók
  ("Zement", "Zementwerk", (2000000, 5000000)),      # cement
  ("Papier", "Papierfabrik", (800000, 4000000)),     # papír
  ("Metall", "Metallwerk", (1000000, 4000000)),      # fémipar
  ("Kalk", "Kalkwerk", (1000000, 3000000)),          # mész
  ("Glas", "Glaswerk", (500000, 2000000)),           # üveg
  ("BioFuel", "Biokraftstoffanlage", (300000, 1500000)), # bioüzemanyag
  ("SpezialChemie", "Spezialchemieanlage", (200000, 1000000)), # kisebb vegyipar
]

companies = []

# 100 fiktív sor generálása
for i in range(1, 101):
  company_type, plant_type, (low, high) = random.choice(sectors)
  operator = f"{company_type}Unternehmen {i:03d} GmbH"
  installation = f"{plant_type} {i:03d}"
  emissions = random.randint(low, high)
  companies.append([operator, installation, "DE", emissions])

# DataFrame létrehozása
df_fiktiv = pd.DataFrame(companies, columns=[
  "Operator (Cég)", "Installation (Telephely)", "Country", "Verified emissions 2024 (tCO₂e)"
])

# Rendezés kibocsátás szerint
df_fiktiv = df_fiktiv.sort_values(by="Verified emissions 2024 (tCO₂e)", ascending=False).reset_index(drop=True)

# Mentés Excel fájlba
df_fiktiv.to_excel("fiktiv_top100_deutschland_2024.xlsx", index=False)

print("✅ Elkészült: fiktiv_top100_deutschland_2024.xlsx")
