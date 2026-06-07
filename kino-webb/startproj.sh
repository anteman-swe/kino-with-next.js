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

    echo -e "${YELLOW}Hämtar och startar containern med PostgreSQL databasen...${NC}"

    docker compose up -d

    echo -e "${YELLOW}Containern har startats, väntar några sekunder så att databasen hinner startas...${NC}"

    echo -e "${YELLOW}Förbereder databasen...${NC}" 

    sleep 1

    npx prisma migrate deploy

    sleep 1

    read -p "Vill du se till att databasen är tom med TypeScript-funktionen? (Y/n): " response

    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

    if [[ -z "$response" || "$response" =~ ^y ]]; then
        echo -e "${GREEN}Startar återställning av databasen...${NC}"

        npm run db:clean
    
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Databasen har framgångsrikt tömts och nollställts!${NC}"
        else
            echo -e "${RED}Något gick snett under tömmningen.${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}Hoppar över tömmning. Går vidare...${NC}"
    fi

    read -p "Vill du prova seeda dummy-data till databasen med TypeScript-funktionen? (Y/n): " response

    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')

    if [[ -z "$response" || "$response" =~ ^y ]]; then
        echo -e "${GREEN}Startar seedning av databasen...${NC}"

        npm run db:seed
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Databasen har seedats framgångsrikt!${NC}"
        else
            echo -e "${RED}Något gick snett under seedningen.${NC}"
            exit 1
        fi
else
    echo -e "${YELLOW}Hoppar över seedning. Går vidare...${NC}"
fi
if [ $? -eq 0 ]; then
        echo -e "${GREEN}Det containeriserade projektet har startats framgångsrikt!\n\n${NC}"
    else
        echo -e "${RED}Något gick snett under försöket att starta containers.${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}Hoppade över allt...${NC}"
fi
