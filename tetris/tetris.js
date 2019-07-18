const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.scale(20, 20);

const instructions = document.getElementById("displayText");


function setInstructions(theInputs) {
    let text = "";
    theInputs.forEach(keys => {
        text += keys.Name;
        text += "<br>";
        keys.Keys.forEach(keyName => {

            if (keyName == " ") {
                text += "Space";
            }
            else {
                text += keyName;
            }
            if (keys.Keys.length > 1)
                text += ","
        })
        text += "<br>";
        text += "<br>";
    })
    instructions.innerHTML = text;
}
class InputGo {
    constructor(Name, Keys) {
        this.Name = Name;
        this.Keys = Keys;
    }
    MyAction = () => { };
}

const Left = new InputGo("Left: ", ["ArrowLeft", "a"]);
const Right = new InputGo("Right: ", ["ArrowRight", "d"]);
const Rotate = new InputGo("Rotate: ", [" "]);
const Down = new InputGo("Down: ", ["s"]);

Left.MyAction = () => {
    PlayerMove(-1);
};
Right.MyAction = () => {
    PlayerMove(1);
};
Rotate.MyAction = () => {
    console.log("Rotate");
};
Down.MyAction = () => PlayerDrop();

function PlayerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}
function PlayerDrop() {
    player.pos.y++;
    CheckForCollision();
    dropCounter = 0;
}
function CheckForCollision() {
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
        return true;
    }
}
function CheckForInput(input, key) {
    if (input.Keys.includes(key.toString())) {
        input.MyAction();
    }
}
const Inputs = [Left, Right, Rotate, Down];

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
]
function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false; s
}
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}
function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = "red";
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}
let lastUpdate = 0;
let dropCounter = 0;
let dropInSecs = 1;
let dropInterval = dropInSecs * 1000;
const lastDown = 18;
function update(time = 0) {
    const deltaTime = time - lastUpdate;
    lastUpdate = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        PlayerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

let arenaWidth = 15;
let arenaHeight = 20;
const arena = createMatrix(arenaWidth, arenaHeight);

const player = {
    pos: { x: 5, y: 5 },
    matrix: matrix,
}

document.addEventListener("keydown", event => {
    Inputs.forEach((input) => {
        CheckForInput(input, event.key);
    })
})
setInstructions(Inputs);
update();