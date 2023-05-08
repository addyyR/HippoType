    const tween = KUTE.fromTo(
        '#blob1',
        { path: '#blob1' },
        { path: '#blob2' },
        { repeat: 999, duration: 3000, yoyo: true }
        ).start();


    const paragraphs = [
        "It was a bitterly cold winter day when a group of friends set out on a trek through the snow-covered mountains. The wind was howling, and the icy air cut through their clothing. But as they trudged through the wilderness, they were struck by the beauty of the snow-covered landscape. The sun began to set, casting an orange and pink glow across the sky. Just as they were starting to lose hope of finding shelter for the night, they stumbled upon a cozy cabin tucked away in a clearing. As they settled in, warming themselves by the fire, they realized that sometimes the greatest adventures come from braving the harshest conditions.",

        "In the heart of the Amazon rainforest, there lived a tribe of people who had never seen the outside world. They lived in harmony with nature, relying on the forest for everything they needed. One day, a group of scientists stumbled upon the tribe and decided to study their way of life. They were amazed by the tribe's knowledge of medicinal plants and their intricate understanding of the jungle. As the scientists prepared to leave, the tribe presented them with a gift – a rare plant that had the power to cure any disease. The scientists were humbled and realized that sometimes the greatest knowledge comes from those who are often overlooked.",

        "In the bustling city of New York, there was a small coffee shop tucked away in a quiet corner. The owner, Maria, was a kind-hearted woman who had a special talent for creating the perfect cup of coffee. One day, a young man walked in looking lost and disheartened. Maria could see the pain in his eyes and offered him a comforting smile and a warm cup of coffee. As they chatted, the man opened up about his struggles and Maria listened with empathy. That small act of kindness and the perfect cup of coffee lifted the man's spirits and gave him hope for a better tomorrow.",

        "Dr. Lee had always been fascinated by the mysteries of the human brain. For years, she had worked tirelessly on a new invention - a device that could read people's thoughts. Finally, after countless sleepless nights, the device was ready for testing. Dr. Lee placed it on her own head and concentrated on a memory from her childhood. To her amazement, the device was able to capture and display the image in perfect detail. The implications of this breakthrough were staggering. It could revolutionize the fields of psychology, neuroscience, and even criminal justice. Dr. Lee felt a sense of awe and responsibility, knowing that her invention had the power to change the world.",

        "The sun had just set over the ocean as Sarah walked along the deserted beach. Suddenly, she spotted a small object washed up on the shore. As she approached, she realized it was a message in a bottle. The note inside was written by a sailor named Jack who had been lost at sea for months. He pleaded for someone to help him, as his food and water supplies were dwindling. Without a moment to spare, Sarah called the coast guard, who were able to locate Jack's vessel and bring him to safety. He thanked Sarah for saving his life and vowed to never forget her kindness.",

        "In the final moments of the championship game, the underdog team was down by three points with only seconds left on the clock. The crowd was on their feet, cheering their hearts out for the players who had fought so hard to get this far. With one last chance, the ball was passed to the team's smallest player, who had been doubted by many throughout the season. But in that moment, with everything on the line, she rose to the occasion and sank a miraculous three-point shot at the buzzer, sending the crowd into a frenzy and securing the team's victory. It was a moment that would inspire young athletes for years to come.",

        "Samantha was an aspiring artist, but no one believed in her talent except for her grandmother. One day, while rummaging through her grandmother's attic, she discovered a hidden painting of an unknown artist. Samantha couldn't help but be drawn to it. She asked her grandmother about it and was shocked to discover that her grandmother was the artist. She had given up her passion to raise her family. Inspired by her grandmother's story, Samantha pursued her own passion with renewed vigor. She painted a portrait of her grandmother, and it was the first painting to sell in her very first art exhibit.",

        "On a hot summer day, a group of friends went on a hike through the forest. As they wandered deeper into the woods, they stumbled upon an old abandoned cabin. The door creaked open, revealing a musty interior. Suddenly, a gust of wind slammed the door shut and the group found themselves trapped inside. As they searched for a way out, they discovered a strange book on a dusty shelf. Its pages were filled with cryptic symbols and strange incantations. One of the friends, who fancied herself a bit of a witch, began reciting the words aloud. And just like that, the door swung open and they were free.",

        "In the heart of the forest, there stood a majestic oak tree that towered over all the other trees. The tree was home to a family of squirrels who lived among its branches. One day, a storm swept through the forest and lightning struck the oak tree, causing a large branch to fall to the ground. The squirrels were devastated and didn't know what to do. But then, they remembered an old legend that spoke of a magical acorn that could heal even the most damaged trees. The squirrels set out on a perilous journey to find the acorn and save their beloved oak tree.",

        "In the year 2157, a team of astronauts embarked on a groundbreaking mission to explore a distant planet known as Kepler-186f. The journey was long and perilous, but the team was determined to uncover the secrets of this uncharted world. As they landed on the surface, they were immediately struck by the planet's eerie silence. However, they soon discovered that the planet was not as lifeless as it seemed. A strange, alien race appeared before them, communicating through a series of hypnotic melodies. Though they couldn't understand the language, the team felt an overwhelming sense of awe and wonder, as they realized they were not alone in the universe."
    ]

    const para = document.getElementById('para');
    const user_input = document.querySelector('.text-input');
    const reset_btn = document.querySelector('.container-in button');
    const total_time = document.querySelector('.time .txt2');
    const total_wpm = document.querySelector('.wpm .txt2');
    const total_mistakes = document.querySelector('.mistakes .txt2');
    const total_accuracy = document.querySelector('.accuracy .txt2');

    let timer;
    let Max_time = 120;
    let Remaining_time = Max_time;
    let CharIndex = 0;
    let mistakes = 0;
    let is_Typing = 0;

    const Set_paragraph = ()=>{
        
        const rand_para_index =  Math.floor(Math.random() * paragraphs.length);
        para.innerText = "";
        
        paragraphs[rand_para_index].split("").forEach(char => {
            //console.log(char);
            para.innerHTML += `<span>${char}</span>`
        });

        para.querySelectorAll("span")[0].classList.add('active');
        document.addEventListener("keydown", () => user_input.focus());
        para.addEventListener("click", () => user_input.focus());

        total_time.innerText = Remaining_time;
        total_wpm.innerText = 0;
        total_mistakes.innerText = 0;
        total_accuracy.innerText = 0;

    }

    const Start_typing = ()=>{

        let characters = para.querySelectorAll("span");
        let Typed_char = user_input.value.split("")[CharIndex];

        if((CharIndex < characters.length - 1) && (Remaining_time > 0)){
            if(!is_Typing){
                timer = setInterval(Start_timer, 1000);
                is_Typing = true;
            }

            if(Typed_char == null){
                if(CharIndex>0){
                    CharIndex--;
                    if(characters[CharIndex].classList.contains("incorrect")){
                        mistakes--;
                    }
                    characters[CharIndex].classList.remove("correct", "incorrect");
                }
            }

            else{
                if(characters[CharIndex].innerText == Typed_char){
                    characters[CharIndex].classList.add("correct");
                }
                else{
                    mistakes++;
                    characters[CharIndex].classList.add("incorrect");
                }
                CharIndex++;
            }

            characters.forEach(char => {
                char.classList.remove("active");
            })

            characters[CharIndex].classList.add("active");

            let wpm = Math.round( ((CharIndex - mistakes) / 5) / (Max_time - Remaining_time) * 60 ); 
            wpm = (wpm < 0) || (!wpm) || (wpm===Infinity) ? 0 : wpm ;

            total_wpm.innerText = wpm;
            total_mistakes.innerText = mistakes;
            total_accuracy.innerText = parseInt(((CharIndex - mistakes) / CharIndex) * 100); 
    }

    else{
        clearInterval(timer);
        }
    }

    const Start_timer = ()=>{

        if(Remaining_time > 0){
            Remaining_time--;
            total_time.innerText = Remaining_time;

            let wpm = Math.round( ((CharIndex - mistakes) / 5) / (Max_time - Remaining_time) * 60 ); 
            total_wpm.innerText = wpm;
        }
        else{
            clearInterval(timer);
            user_input.value = "";
        }
    }

    const Reset_paragraph = ()=>{
        
        // const pulseButton = document.getElementById("pulse-button");

        // pulseButton.addEventListener("click", () => {
        //     const logo = document.querySelector(".hippo-logo");
        //     logo.classList.add("flip");

        //     logo.addEventListener("animationend", () => {
        //     logo.classList.remove("flip");
        //     });
        // });

        Set_paragraph();
        clearInterval(timer);
        Remaining_time = Max_time;
        CharIndex = 0;
        mistakes = 0;
        is_Typing = 0;
        user_input.value = "";
        total_time.innerText = Remaining_time;
        total_wpm.innerText = 0;
        total_mistakes.innerText = 0;
        total_accuracy.innerText = 0;

    }
    
    Set_paragraph();
    reset_btn.addEventListener("click", Reset_paragraph);
    user_input.addEventListener("input", Start_typing);