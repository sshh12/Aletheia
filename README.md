
# Aletheia

> An AI-powered epic translation comparison tool.

## About
Aletheia takes a pair of translations of a specific piece of text and compares them side-by-side using the results of several machine learning models. This allows us to compare/contrast the liberties taken by translators in word choice, sentiment, and phrasing.

![sc](https://user-images.githubusercontent.com/6625384/69382933-e0316400-0c7d-11ea-9a99-20a9fdb13e90.png)

## Usage

### Requirements
Python 3, NodeJS, Stanford Core NLP, and a GCP project setup with appropriate API credentials.

### Adding a Translation
Create files `db/NAME.BOOK.VERSION.txt` and `db/NAME.BOOK.VERSION.meta`. Put the raw text of the translation in the text file and the name of the translator in the the meta file.
Run `$ python scripts/prepro.py` (this will take a long time, ~30min/text).

### Running the Server
Run `$ yarn install`, `$ yarn build`, `pip install -r requirements.txt`, and then `$ python server.py`.

## CC303: Mythology
> **The general prompt for a creative project is the place of classical mythology in the modern world.** To some extent, any creative project in this class is about the place of classical mythology in the modern world -- your project is created by and for a modern audience, after all -- but this prompt asks you to contemplate what you are creating, and/or why, and/or how you are creating it. If you are drawn to depict or represent a particular character, event, scene, or idea, for example, why do you think that is important to you? Why does that character, event, scene, or idea move you (or why does it not)? Can that reflection be incorporated into the art? Does the medium you are working in allow for new possibilities that were not available to the ancients? Why might this be important? These are all examples of questions that a creative project might seek to answer.

> **Usage**
> Go to https://cc303.sshh.io/ (for the best experience use chrome on a non-mobile device). Select a poem, then two versions, then click Analyze. The site will display the two translations side by side with generated analysis. For a helpful usage diagram or to view the source code visit https://github.com/sshh12/Aletheia. If your interested in other epics/books/translations, let me know and I can add them. 
>
> The numbers at the top represent stylistic characteristics of the translation as a whole. Readability refers to how easy it is to read (higher = more readable). Type-Token Ratio is a measure of vocabulary diversity (higher = more diverse).
>
> Sentiment by Quote Speaker shows how quotes by different speakers in the text have different sentiments (red = angrier, green = happier). Note: the model wasn’t always able to determine the name of the speaker so it instead uses their pronoun as written in the text (e.g. it might say “He” but that could be Aeneas).
>
> Unique Word shows the most common words used in the translation (excluding non-salient words like “the”, “a”, etc.)
>
> Each section includes a color bar that represents its sentiment score, bolded/colored words which represent keywords (words that were determined as significant when the AI was predicting the meaning and sentiment of the section), and emojis which illustrate the emotions the AI determined the audience would feel given the events described in the text.
>
> **Creative Intent**
> Since ancient Greek and Latin are no longer common in our modern-day world, many rely on modern translations of old texts to interpret and understand the events and ideals of the past. Since a large part of our interpretation of ancient texts comes from word choice, it is important to understand how these translations can alter the original meaning/sentiments and how a translator’s writing style may bias them. While it is unlikely the intent of translators, their own experience, language studies, and knowledge of mythology will affect how they interpret and therefore translate epic poems. This project aims to provide a medium in which to compare translations of the same original text side by side. For both practicality (manual analysis would take forever) and to use the latest technologies, AI is used to generate features (sentiment scores, keywords, etc.) that can be used by a human to better understand the differences between translations. The program takes raw pieces of text, parses and aligns them, then runs them through several machine learning algorithms that are adapted to analyze textual language. The website then displays the outputs of these algorithms in a more human-interpretable format.