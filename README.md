Utility classes to generate random values from the hexagrams of the I Ching. Overcomplicated random number generator.

## Usage

`npm i soothsayer`

Then, import the module into your project

`import ictable from 'soothsayer'` or
```
import {
  generateHexagram,
  generateSecondaryHexagram,
  resolveHexagram
} from 'soothsayer
```

Now, calling `generateHexagrams` as many times as you wish, create a series
of hexagrams. If you want, you can derive a second set of hexagrams from
the first, by passing your original hexagram to `generateSecondaryHexagram`

Next, create several ranges of numbers. To each of those ranges, assign an interesting
value. For example, a series of pitches:

 1-8: C
 9-16: D
 17-24: E


 ...and so on...

Pass your hexagrams to `resolveHexagram` to get a number. Map that number back
the the ranges your created and use the designated value in your project.

  
