**Dungeons and Dragons Normalized Relations**

CAMPAIGN([CampaignID,]{.ul} DungeonMaster)

PLAYER([PlayerID,]{.ul} Name, YearsPlayed, CampaignsPlayed)

PLAY([PlayerID, CampaignID,]{.ul} Sessions)

FK PlayerID -\> PLAYER

CampaignID -\> CAMPAIGN

RACE([RaceID,]{.ul} Name)

BACKGROUND([BackgroundID,]{.ul} Name, SpecialAbility)

CLASS([ClassID,]{.ul} Name, HPDice)

CLASS_TRAITS([ClassID, Trait)]{.ul}

FK ClassID -\> CLASS

SUBCLASS([SubclassName, ClassID,]{.ul} Proficiency[)]{.ul}

FK ClassID -\> CLASS

CHARACTER([CharacterID,]{.ul} PlayerID, RaceID, BackgroundID, ClassID, Name, Level, HP)

FK PlayerID -\> PLAYER

RaceID -\> RACE

BackgroundID -\> BACKGROUND

ClassID -\> CLASS

CHARACTER_ABILITY_SCORES([CharacterID, AbilityScore)]{.ul}

FK CharacterID -\> CHARACTER
