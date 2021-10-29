
Think of n-selector as an endlessly extendable multi-way n-gang switch.

Firstly, it allows the selection of a position by the position of an option in a primary index and then returns a value or an array of all the options that fall under that position.

Secondly, it allows selection by a simple scalar value (0.0 to 1.0) and can return a value or an array of the options at that position.

```
       0.00 ... 0.25 ... 0.50 ... 0.75 ... 1.00
        |--------|--------|--------|--------|
Primary |    One    |    Two    |   Three   |
Gang +1 |    Red    |   Green   |    Blue   |
Gang +2 |       One       |       Two       |

select('one') - returns ['One', 'Red', 'One']
select(2) - returns ['Two', 'Green', 'One']
position(0.75) - returns ['Three', 'Blue', 'Two']
```


#### Installation

```shell
npm install --save @thebespokepixel/n-selector
```

#### Examples

```javascript
import {createSelector} from '@thebespokepixel/n-selector'

const matrix = createSelector(['one', 'two', 'three'], 0)

matrix.select(0) - returns 'one'
matrix.position(0.5) - returns 'two'
```
