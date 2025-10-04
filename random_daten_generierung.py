import pandas as pd
import random

# Sektoren und die dazugehörigen realistischen Emissionsbereiche (tCO₂e)
sectors = [
  ("Energie", "Kraftwerk", (15000000, 25000000)),
  ("Stahl", "Stahlwerk", (8000000, 18000000)),
  ("Chemie", "Chemiewerk", (5000000, 12000000)),
  ("Raffinerie", "Raffinerie", (3000000, 7000000)),
  ("Zement", "Zementwerk", (2000000, 5000000)),
  ("Papier", "Papierfabrik", (800000, 4000000)),
  ("Metall", "Metallwerk", (1000000, 4000000)),
  ("Kalk", "Kalkwerk", (1000000, 3000000)),
  ("Glas", "Glaswerk", (500000, 2000000)),
  ("BioFuel", "Biokraftstoffanlage", (300000, 1500000)),
  ("SpezialChemie", "Spezialchemieanlage", (200000, 1000000)),
]

companies = []

# Generierung von 100 fiktiven Zeilen
for i in range(1, 101):
  company_type, plant_type, (low, high) = random.choice(sectors)
  operator = f"{company_type}Unternehmen {i:03d} GmbH"
  installation = f"{plant_type} {i:03d}"
  emissions = random.randint(low, high)
  companies.append([operator, installation, "DE", emissions])

# Erstellung eines DataFrames
df_fiktiv = pd.DataFrame(companies, columns=[
  "Operator (Cég)", "Installation (Telephely)", "Country", "Verified emissions 2024 (tCO₂e)"
])

# Sortierung nach Emissionen
df_fiktiv = df_fiktiv.sort_values(by="Verified emissions 2024 (tCO₂e)", ascending=False).reset_index(drop=True)

# Speichern in eine Excel-Datei
df_fiktiv.to_excel("fiktiv_top100_deutschland_2024.xlsx", index=False)

print("✅ Fertig: fiktiv_top100_deutschland_2024.xlsx")
