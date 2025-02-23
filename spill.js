const spillbrett = document.querySelector(".spillbrett")
            const WIDTH = spillbrett.offsetWidth
            const HEIGHT = spillbrett.offsetHeight
            const target = document.querySelector("#ball14")

            const baller = []

            for (let i = 1; i <= 23; i++) {
                baller.push({
                    ballElm: document.getElementById(`ball${i}`),
                    venstre: Math.floor(Math.random() * 200),
                    topp: Math.floor(Math.random() * 200),
                    x_fart: Math.floor(Math.random() * 8) + 1,
                    y_fart: Math.floor(Math.random() * 8) + 1,
                })
            }


            function tilfNyFart() {
                return (Math.random() * 2-1) // Gir et tall mellom -1 og 1
            }

            function detekterKollisjon(ball) {
                const BALL_WIDTH = ball.ballElm.offsetWidth
                const BALL_HEIGHT = ball.ballElm.offsetHeight

                if (ball.venstre >= WIDTH - BALL_WIDTH || ball.venstre <= 0) {
                    ball.x_fart *= -1
                    ball.x_fart += tilfNyFart()
                }

                if (ball.topp >= HEIGHT - BALL_HEIGHT || ball.topp <= 0) {
                    ball.y_fart *= -1
                    ball.y_fart += tilfNyFart()
                }
            }


            function flyttBall(ball) {
                // Flytt på ballen:
                ball.venstre += ball.x_fart
                ball.topp += ball.y_fart
                ball.ballElm.style.left = ball.venstre + "px"
                ball.ballElm.style.top = ball.topp + "px"
            }

            function oppdater() {
                for (let ball of baller) {
                    detekterKollisjon(ball)
                    flyttBall(ball)
                }


                requestAnimationFrame(oppdater)
            }

            oppdater()

            target.addEventListener("mousedown", vunnetSpill) //Testet ut og "mousedown" funket bedre fordi den reagerer med en gang target blir trykket

            function vunnetSpill() {
                alert("Du vant spillet!")
                location.reload() // Gjør at spillet restarter istedefor å fortsette etter man har vunnet
            }
            let tall = 15
            let antall = document.querySelector(".klokke > h1")

            let myInterval = setInterval(function () {
                tall--
                antall.innerHTML = "Tid: " + tall + " Sek"

                if (tall === 0) {
                    alert("Du tapte spillet!")
                    location.reload() // Gjør at spillet restarter istedefor å fortsette etter man har tappet
                    clearInterval(myInterval)
                }
            }, 1000);
