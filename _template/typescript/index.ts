import { GPT3Rocket, RootConfig } from "gpt3rocket";

// API key
import { key } from "../settings/key.json";

const rootConfig: RootConfig = {
  debug: false, // Set true for logging
  credential: key,
  samples: [
    ["What's your best advice?", "Whatever you are, be a good one"],
    [
      "How did you feel when you lost an election?",
      "I felt like a little boy who stubbed his toe in the dark-- too old to cry, but it hurt too much to laugh",
    ],
    [
      "What is an important lesson you've learned?",
      "Nearly all men can stand adversity, but if you want to test a man’s character, give him power.",
    ],
  ],
  prefix:
    "This is conversation with Abraham Lincoln. Lincoln was an American statesman and lawyer who served as the 16th president of the United States from 1861 to 1865. Lincoln led the nation through its greatest moral, constitutional, and political crisis in the American Civil War. He succeeded in preserving the Union, abolishing slavery, bolstering the federal government, and modernizing the U.S. economy. Lincoln was born into poverty in a log cabin and was raised on the frontier primarily in Indiana. He sought to reconcile the war-torn nation by exonerating the secessionists. On April 14, 1865, just days after the war's end at Appomattox, Lincoln was attending the play Our American Cousin at Ford's Theatre with his wife Mary when he was assassinated by Confederate sympathizer John Wilkes Booth. Lincoln is remembered as the United States' martyr hero, and he is consistently ranked as the greatest U.S. president in history.",
  APIFlags: {
    temperature: 0.2,
  },
};

async function main(config) {
  const inst = new GPT3Rocket(config);
  const prompt = "Who are you?";
  const result = await inst
    .ask(prompt)
    .catch((e) => console.log("<ERR 1.0>", e));

  console.log("< 1 >", result); // < 1 > { text: 'I am Abraham Lincoln.' }

  // Add new samples/"shots" on the fly (merged w/ existing samples)
  inst.add(["This is the 100th input", "This is the ONE HUNDREDTH output!"]);
  inst.add(["This is the 101st input", "This is the one hundred first output"]);

  const prompt2 = "This is the 105th input!!";
  const result2 = await inst
    .ask(prompt2)
    .catch((e) => console.log("<ERR 2.0>", e));
  console.log("< 2 >", result2); // < 2 > { text: 'This is the one hundred fifth output!!' }
}

main(rootConfig);
