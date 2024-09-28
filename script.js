const pokemonData = {
    1: { name: "Gengar", height: "1.5m", weight: "40kg", hp: 60, attack: 65, defense: 60, speed: 110, moves: ["Shadow Ball", "Lick"], abilities: "Cursed Body" },
    2: { name: "Alakazam", height: "1.5m", weight: "48kg", hp: 55, attack: 50, defense: 45, speed: 120, moves: ["Psychic", "Confusion"], abilities: "Synchronize" },
    3: { name: "Pikachu", height: "0.4m", weight: "6kg", hp: 35, attack: 55, defense: 40, speed: 90, moves: ["Thunderbolt", "Quick Attack"], abilities: "Static" },
    4: { name: "Charizard", height: "1.7m", weight: "90.5kg", hp: 78, attack: 84, defense: 78, speed: 100, moves: ["Flamethrower", "Fly"], abilities: "Blaze" },
    5: { name: "Bulbasaur", height: "0.7m", weight: "6.9kg", hp: 45, attack: 49, defense: 49, speed: 45, moves: ["Vine Whip", "Razor Leaf"], abilities: "Overgrow" },
    6: { name: "Squirtle", height: "0.5m", weight: "9kg", hp: 44, attack: 48, defense: 65, speed: 43, moves: ["Water Gun", "Bubble"], abilities: "Torrent" },
    7: { name: "Jigglypuff", height: "0.5m", weight: "5kg", hp: 115, attack: 45, defense: 50, speed: 20, moves: ["Sing", "Pound"], abilities: "Cute Charm" },
    8: { name: "Meowth", height: "0.4m", weight: "4.2kg", hp: 40, attack: 45, defense: 35, speed: 90, moves: ["Scratch", "Bite"], abilities: "Pickup" },
    9: { name: "Snorlax", height: "2.1m", weight: "460kg", hp: 160, attack: 110, defense: 65, speed: 30, moves: ["Body Slam", "Rest"], abilities: "Immunity" },
    10: { name: "Lucario", height: "1.2m", weight: "54kg", hp: 70, attack: 110, defense: 70, speed: 90, moves: ["Aura Sphere", "Close Combat"], abilities: "Steadfast" },
    11: { name: "Gardevoir", height: "1.6m", weight: "48kg", hp: 68, attack: 65, defense: 65, speed: 80, moves: ["Psychic", "Moonblast"], abilities: "Trace" },
    12: { name: "Dragonite", height: "2.2m", weight: "210kg", hp: 91, attack: 134, defense: 95, speed: 80, moves: ["Outrage", "Dragon Claw"], abilities: "Inner Focus" },
    13: { name: "Blaziken", height: "1.9m", weight: "52kg", hp: 80, attack: 110, defense: 70, speed: 80, moves: ["Flare Blitz", "Sky Uppercut"], abilities: "Blaze" },
    14: { name: "Lapras", height: "2.5m", weight: "220kg", hp: 130, attack: 85, defense: 80, speed: 60, moves: ["Surf", "Ice Beam"], abilities: "Water Absorb" },
    15: { name: "Mewtwo", height: "2m", weight: "122kg", hp: 106, attack: 110, defense: 90, speed: 130, moves: ["Psystrike", "Hyper Beam"], abilities: "Pressure" },
};

let selectedPokemon = [];

function selectPokemon(id) {
    const card = document.querySelector(`.pokemon-card[data-pokemon-id="${id}"]`);
    if (selectedPokemon.includes(id)) {
        selectedPokemon = selectedPokemon.filter(pokemonId => pokemonId !== id);
        card.classList.remove("selected");
    } else {
        if (selectedPokemon.length < 2) {
            selectedPokemon.push(id);
            card.classList.add("selected");
        }
    }
    updateBattleButton();
    showPokemonDetails(id);
}

function updateBattleButton() {
    const battleButton = document.getElementById("battle-button");
    battleButton.style.display = selectedPokemon.length === 2 ? "block" : "none";
}

function playCry(url) {
    const audio = new Audio(url);
    audio.play();
}

function showPokemonDetails(id) {
    const pokemon = pokemonData[id];
    const modal = document.getElementById("pokemon-modal");
    document.getElementById("modal-name").innerText = pokemon.name;
    document.getElementById("modal-height").innerText = pokemon.height;
    document.getElementById("modal-weight").innerText = pokemon.weight;
    document.getElementById("modal-hp").innerText = pokemon.hp;
    document.getElementById("modal-attack").innerText = pokemon.attack;
    document.getElementById("modal-defense").innerText = pokemon.defense;
    document.getElementById("modal-speed").innerText = pokemon.speed;
    document.getElementById("modal-moves").innerText = pokemon.moves.join(", ");
    document.getElementById("modal-abilities").innerText = pokemon.abilities;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("pokemon-modal").style.display = "none";
}

function startBattle() {
    const [firstId, secondId] = selectedPokemon;
    const firstPokemon = pokemonData[firstId];
    const secondPokemon = pokemonData[secondId];

    const firstMove = getRandomMove(firstPokemon.moves);
    const secondMove = getRandomMove(secondPokemon.moves);

    const firstDamage = calculateDamage(firstPokemon, secondPokemon, firstMove);
    const secondDamage = calculateDamage(secondPokemon, firstPokemon, secondMove);

    let winner = firstDamage > secondDamage ? firstPokemon.name : secondPokemon.name;

    const summary = `Winner: ${winner}\n${firstPokemon.name} used ${firstMove} and dealt ${firstDamage} damage\n${secondPokemon.name} used ${secondMove} and dealt ${secondDamage} damage`;
    displayBattleSummary(summary);

    selectedPokemon = [];
    document.querySelectorAll(".pokemon-card").forEach(card => card.classList.remove("selected"));
    updateBattleButton();
}

function getRandomMove(moves) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function calculateDamage(attacker, defender, move) {
    const level = 50; // Assume both Pokémon are level 50
    const movePower = move === "Flamethrower" ? 90 : move === "Thunderbolt" ? 90 : 80; // Example, can be adjusted
    const attack = attacker.attack;
    const defense = defender.defense;
    const typeEffectiveness = 2.0; // Assume super effective move
    const accuracy = 0.85; // Assume a fixed accuracy for simplicity
    const speed = attacker.speed;

    return Math.floor(((2 * level / 5 + 2) * (attack / defense) * movePower * typeEffectiveness * accuracy * (speed / 100)));
}

function displayBattleSummary(summary) {
    const battleSummaryDiv = document.getElementById("battle-summary");
    battleSummaryDiv.innerText = summary;
    battleSummaryDiv.style.display = "block";

    // Add visual effect
    battleSummaryDiv.classList.add("fade-in");
    setTimeout(() => {
        battleSummaryDiv.classList.remove("fade-in");
    }, 3000); // Fade out after 3 seconds
}
