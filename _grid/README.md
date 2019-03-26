# @rdey/grid

A grid component. Has multiple break points


| Name | WindowSize (px) |
-------|-------------
| femto | 0 |
| pico | 360 |
| nano | 400 |
| micro | 480 |
| milli | 600 |
| one | 720 |
| kilo | 840 |
| mega | 960 |
| giga | 1024 |
| tera | 1280 |
| peta | 1360 |

Usage:
```jsx
<Grid>
  {range(12).map((ii) => (
    <Box key={ii} />
  ))}
</Grid>
```

To specify the margin size and the number of column at a specific break point use:

```jsx
<Grid kilo={{ margin: 1, columns: 12 }}>
  {range(12).map((ii) => (
    <Box key={ii} />
  ))}
</Grid>
```

