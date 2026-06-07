#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n\n${GREEN}Detta skript startar en produktionsklar containeriserad web-server${NC}"
echo -e "${GREEN}och en PostgreSQL databas som körs i en egen container${NC}"
echo -e "${GREEN}för vår Kino websajt...\n"

read -p "Vill du gå vidare och köra docker compose för att försöka starta containrarna? (Y/n): " response

response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

if [[ -z "$response" || "$response" =~ ^y ]]; then
    echo -e "${GREEN}Startar skriptet...${NC}"

    echo -e "${YELLOW}Hämtar och startar containern med PostgreSQL databasen...\n${NC}"

    docker compose -f compose.twocont.yaml up -d

    echo -e "${YELLOW}Containern har startats, väntar några sekunder så att databasen hinner startas...${NC}"

    echo -e "${YELLOW}Förbereder databasen...${NC}" 

    sleep 1

    npx prisma migrate deploy

    sleep 1

    read -p "Vill du se till att databasen är tom med TypeScript-funktionen? (Y/n): " response

    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

    if [[ -z "$response" || "$response" =~ ^y ]]; then
        echo -e "${GREEN}\nStartar återställning av databasen...${NC}"

        npm run db:clean
    
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}\nDatabasen har framgångsrikt tömts och nollställts!${NC}"
        else
            echo -e "${RED}\nNågot gick snett under tömmningen.${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}\nHoppar över tömmning. Går vidare...${NC}"
    fi

    read -p "\nVill du prova seeda dummy-data till databasen med TypeScript-funktionen? (Y/n): " response

    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

    if [[ -z "$response" || "$response" =~ ^y ]]; then
        echo -e "${GREEN}\nStartar seedning av databasen...${NC}"

        npm run db:seed
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}\nDatabasen har seedats framgångsrikt med dummy-data!${NC}"
        else
            echo -e "${RED}\nNågot gick snett under seedningen.${NC}"
            exit 1
        fi
else
    echo -e "${YELLOW}\nHoppar över seedning. Går vidare...${NC}"
fi
if [ $? -eq 0 ]; then
        echo -e "${GREEN}\nDet containeriserade projektet har startats framgångsrikt!\n\n${NC}"
        echo -e "${YELLOW}\nNu går det att öppna sin webbläsare till http://localhost:3000\n\n${NC}"
    else
        echo -e "${RED}\nNågot gick snett under försöket att starta containers.${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}\nHoppade över allt...${NC}"
fi
