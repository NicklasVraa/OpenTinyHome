# <img src="resources/logo.svg" width="50" style="vertical-align: -10px"/> Scaffold

An **open standard** for designing and optimizing plans for real-world homes.
<table><tr>
    <td><img src="showcase/the_nano/images/img_0001.jpg"></td>
    <td><img src="showcase/the_micro/images/img_0005.jpg"></td>
    <td><img src="showcase/the_micro/images/img_0001.jpg"></td>
    <td><img src="resources/images/pack_output_1.png"></td>
</tr></table>

**Purpose**: *To provide anyone with the necessary knowledge to build their own home.*
Concretely, the intent with Scaffold is the following:
1. To define an open **standard** for designing homes in 3D-modelling software.
<!-- 2. To establish and grow a **knowledge base** for all things related to home building. -->
1. To provide localized collections of pre-modelled **3D components**.
2. To offer digital tools for construction **planning** and material **optimization**.
3. To act as a hub for **sharing** home designs.

Scaffold is primarily intended for *tiny-house* homes, but scales to projects of any size.

<details><summary><b>Read more about the motivation of this project</b></summary>

> The barrier-of-entry for building a home is incredibly high. Traditionally, to design and build a home that is up-to-code and suitable for year-round dwelling, one needs degrees in **carpentry**, **electrics** and **plumbing**, or a lifetime of practical **DIY experience** and solid know-how. In any case, many months of dedicated research is unavoidable.
>
> Couple these facts with the absolutely ludicrous state of the global housing market, the prospect of ever owning one's own home becomes vanishingly small.
>
> To provide a competitive alternative to the housing market, the barrier-of-entry for home building must be lowered all the way to the ground floor. This project aims to do this through providing complete, step-by-step home blueprints that assumes no prior knowledge on part of the reader.

</details>

---
**Shortcuts**: [Workflow](#workflow) | [3D-Modelling](#3d_modelling) | [Component Lists](#component_lists) | [Scaffold.py](#scaffold_lib) | [Showcase](#showcase) | [Contribute](#contribute)

---


## Workflow<a name="workflow"></a>
For the ones interested in designing their own home using this repository, the recommended workflow is as follows:

1. Build a **3D model** of your home using the components in a starter file.
2. Use the model to compile a **components list** in the specified csv format.
3. Find or compile a **stock list** that applies to the area in which you live.
4. Use the **scaffold** library to generate shopping lists, cutting diagrams and estimates.

For anyone interested in building a home that has already been designed, simply browse the [showcase](#showcase) section and download a blueprint.

---
### 3D-Modelling<a name="3d_modelling"></a>
> Why invest time into modelling my entire home?

There are **numerous advantages** to modelling your home digitally before ever starting to the build process. These are but a few:

- When you have a model, iterating on ideas and making changes is extremely simple and will cost nothing. You are free to try out different layouts, materials and sizes.
- Communicating your ideas to others that will be involved in the build process becomes as simple as showing them the model. The risk of misunderstandings is reduced to near-zero.
- With a finished model, you will have every single length and angle measurement beforehand. Using the provided tools, you can plan every single cut before ever touching a saw. This allows you to optimize both the build process and material utiliization, reducing both the impact on the environment and your wallet.
- The advantages that are listed above will make obtaining planning permissions much more feasible.

**Modelling Software**:\
Any modelling tool capable of assigning geometry into **components**, **groups**, and assigning **tags**, is suitable for home modelling. **SketchUp** is very good option, as it is extremely intuitive and available online, free-of-charge (though not FOSS).

#### Model Structure
The recommended structuring of models is illustrated below with an example:

```
My_home
    module_01:1st_floor
        assembly_01:floor
            board_45_195_2120
            sheet_12_1220_2440
            insulation_195_565_2120
            ...
        assembly_02:north_wall
            board_45_195_2120
            window_20_1000_1000
            outlet
            ...
        ...
    module_02:2nd_floor
        assembly_03:east_gable
            ...
        ...
    module_03:roof
        ...
    ...
```

- A **module** is a group of **assemblies**. An **assembly** is a group of **components**. Modules and assemblies should be tagged as `module_xx:name` and `assembly_xx:name`.
- A **component** is a basic building block, and should be be tagged with their category, e.g. a `category_xx:board` and `category:sheathing`.
- Variable-size components like boards and sheets should include dimensions in their name, e.g. `board_thickness_width_length`.
- A component can be made up of other components, e.g. several electrical switch types share standard components like fastening.

**Note**: Component models need only be as complex as is needed to convey structure and function.


#### Starters <a name="starters"></a>
Starters are files that includes components from which fully realistic homes can be modelled. Starters will be in continuous development. The first starter will be a SketchUp file that uses the metric system and standard components available in Denmark (use this as a reference for how to structure other starters).

**Naming**: `starter_[country_code]_[unit_system].[file_extension]`.

| File | Preview |
| ---- | ------- |
| [starter_dk_metric.skp](starters/starter_dk_metric.skp) includes Lauritz Knudsen (Scheider Electrics) basic components. Plumbing components and other commonly used building materials are coming, including commercially available solar panel systems.  | <img src="starters/starter_dk_metric_preview.png"> |

---
### Component Lists<a name="component_lists"></a>
To take full advantage of having a model of our projects, we must extract data from it. Once a model has been completed, we use it to compile a list of required components as a `csv` file.

Below is an explanation of such a "`components.csv`" file.

<details><summary><b>Components.csv</b></summary>

Header:`category;material;module;assembly;uses;count;thickness;width;length;slope;var_dims`

| Columns     | Explanation                                                                            |
| :---------- | :------------------------------------------------------------------------------------- |
| `category`  | Arbitrary category description, e.g. `board`, `sheathing`, `insulation`, etc.          |
| `material`  | Arbitrary material description, e.g. `untreated pine`, `galvanized steel`, etc.        |
| `module`    | Location in structure, e.g. `1st floor`, `2nd floor`, `attic` etc.                     |
| `assembly`  | Location in module, e.g. `floor`, `north wall`, `inner wall`, etc.                     |
| `uses`      | What component is used for, e.g. `joist`, `stud`, `inner sheathing`, etc.              |
| `count`     | Simply the number of identical components to avoid repeating lines                     |
| `thickness` | Typically the shortest dimension of the component.                                     |
| `width`     | Typically the second shortest dimension of the component.                              |
| `length`    | Typically the longest dimension of the component.                                      |
| `slope`     | The angle of the cut into the stock to produce this component                          |
| `var_dims`  | The number of variable dimensions of the stock, e.g. boards have `1`, sheets have `2`. |

</details><br>

To take advantage of this components list, we also need a list of commercially available (off-the-shelf) stock components, e.g. lumber of standardized dimensions, etc. since it is not possible to purchase construction components with specific dimensions.

Below is the explanation of the structure of such a "`stock.csv`" file.

<details><summary><b>Stock.csv</b></summary>

Header:`category;material;thickness;width;length;count;unit_cost;norm_cost;density;retailer;load;var_dims`

| Columns     | Explanation                                                                        |
| :---------- | :--------------------------------------------------------------------------------- |
| `category`  | Arbitrary category description, e.g. `board`, `sheathing`, `insulation`, etc.      |
| `material`  | Arbitrary material description, e.g. `untreated pine`, `galvanized steel`, etc.    |
| `count`     | Simply the number of identical components to avoid repeating lines                 |
| `thickness` | Typically the shortest dimension of the component.                                 |
| `width`     | Typically the second shortest dimension of the component.                          |
| `length`    | Typically the longest dimension of the component.                                  |
| `count`     | The count of individual components in one unit, e.g. 20-pack nails.                |
| `unit_cost` | The cost of one of these stock items/packs.                                        |
| `norm_cost` | The normalized cost, e.g. `eur/m`, `usd/m^2`, etc.                                 |
| `density`   | The mass per volume, e.g. `kg/m^3`.                                                |
| `retailer`  | Where the entry data is from, i.e. where this stock can be bought.                 |
| `load`      | Whether the stock is rated for load-bearing, `0` for no, `1` for yes.              |
| `var_dims`  | The number of variable dimensions of the stock, e.g. boards have `1`, sheets have `2`. |

The components and stock files can have any name, but the stock-file's name is encouraged to follow the pattern `[localization]_[unit-system]_[...].csv`, e.g. `dk_metric.csv` or `us_imperial.csv`, such that they can be shared.

</details><br>

**Note**:
- The names of the csv files are irrelevant to the program.
- Columns are semicolon-separated by default, but is settable using the `sep=` parameter.
- The order of the columns is irrelevant to the program, but the shown order is encouraged.
- Blank lines and `# comments` are ignored by the program, so can be used to increase readability.
- The `var_dims` number determines the dimensionality of the applied packing algorithm.

---
### The Scaffold Library <a name="scaffold_lib"></a>
Using the `components.csv` and `stock.csv` files together with the `Scaffold` python library, we can generate **stock shopping lists**, **cutting diagrams** and extremely accurate estimates of **costs**, **volumes** and **masses** of constructions, both in total and for individual modules, assemblies, categories and any combinations thereof.

```python
# Import the Plan class from the scaffold library.
from scaffold import Plan
```

```python
# Load in components and available stock.
plan = Plan("path/to/components.csv", "path/to/stock.csv")
```

```python
# Optionally apply filters to the components and/or stock lists.
# Filters are standard Pandas queries.
plan.filter_components("module == 'base' and category == 'board'")
plan.filter_stock("length <= 4800")
```

```python
# Visualize all components.
components = plan.inspect(combine=True, sort=True, show=True)
```

<details><summary>Output example</summary>
<table><tr style="vertical-align:top">
    <td><img src="resources/images/inspect_output.png"></td>
</tr></table>
</details><br>

```python
# Pack components into appropriate stock.
packings = plan.pack(show=True, cut_thickness=1)
```

<details><summary>Output example</summary>
<table><tr style="vertical-align:top">
    <td><img src="resources/images/pack_output_1.png"></td>
    <td><img src="resources/images/pack_output_2.png"></td>
    <td><img src="resources/images/pack_output_3.png"></td>
</tr><tr style="vertical-align:top">
    <td><img src="resources/images/pack_output_4.png"></td>
    <td><img src="resources/images/pack_output_5.png"></td>
    <td>An example output of running the pack function with show=True. Boards and sheathings are placed on appropriate stock and arranged to maximize utilization, i.e. minimize waste.</td>
</tr></table>
</details><br>

```python
# Summarize findings, i.e. cost, volume, mass, stock utilization, etc.
plan.summarize(currency="dkk")
```

<details><summary>Output example</summary>

```
Summary:
--------
Required stock:
• 17x 45x45x5400 untreated pine board
  63.43 dkk/unit at stark.dk
  Cost: 1078.31 dkk, Volume: 0.18 m³, Mass: 81.47 kg
  Utilization: 97.39%

• 28x 45x95x5400 untreated pine board
  94.78 dkk/unit at stark.dk
  Cost: 2653.84 dkk, Volume: 0.63 m³, Mass: 282.61 kg
  Utilization: 97.16%

• 34x 45x195x5400 untreated pine board
  177.93 dkk/unit at lavpristrae.dk
  Cost: 6049.62 dkk, Volume: 1.51 m³, Mass: 681.15 kg
  Utilization: 93.95%

• 42x 12x1220x2440 plywood sheathing
  299.0 dkk/unit at jemogfix.dk
  Cost: 12558.0 dkk, Volume: 1.33 m³, Mass: 610.52 kg
  Utilization: 88.46%

• 12x 15x1220x2440 plywood sheathing
  349.0 dkk/unit at jemogfix.dk
  Cost: 4188.0 dkk, Volume: 0.52 m³, Mass: 239.24 kg
  Utilization: 97.06%

Total cost: 26527.77 dkk
Total volume: 4.17 m³
Total mass: 1894.99 kg
```

</details><br>

---
## Showcase <a name="showcase"></a>
The place where home models and their plans are displayed.

<details><summary><b>The Nano</b></summary>

### The Nano
A modular tiny home designed to be on wheels.

![img_0001](showcase/the_nano/images/img_0001.jpg)
<table>
    <tr>
        <td><img src="showcase/the_nano/images/img_0002.jpg"></td>
        <td><img src="showcase/the_nano/images/img_0003.jpg"></td>
    </tr>
    <tr>
        <td><img src="showcase/the_nano/images/img_0004.jpg"></td>
        <td><img src="showcase/the_nano/images/img_0005.jpg"></td>
    </tr>
    <tr>
        <td><img src="showcase/the_nano/images/img_0006.jpg"></td>
        <td><img src="showcase/the_nano/images/img_0007.jpg"></td>
    </tr>
</table>
</details>

<details><summary><b>The Micro</b></summary>

### The Micro <a name="reference"></a>
This is a model designed **only to be a reference plan** for others that wish to contribute with their own plans. It serves to illustrate the idea of building a complete model as one would a real house, i.e. using discrete units of timber, fasteners, etc. It also serves to demonstrate how to organize the model using tags. [Model](reference/model.skp) | [Materials](reference/materials.ods)

![img_0001](reference/images/img_0001.jpg)

<table>
    <tr>
        <td><img src="showcase/the_micro/images/img_0002.jpg">
        Framing and inner sheathing.</td>
        <td><img src="showcase/the_micro/images/img_0003.jpg">
        Outer sheathing.</td>
    </tr>
    <tr>
        <td><img src="showcase/the_micro/images/img_0004.jpg">
        Thermal control layer (insulation).</td>
        <td><img src="showcase/the_micro/images/img_0005.jpg">
        The 1st floor internal layout.</td>
    </tr>
    <tr>
        <td><img src="showcase/the_micro/images/img_0006.jpg">
        The 2nd floor internal layout.</td>
        <td><img src="showcase/the_micro/images/img_0007.jpg">
        Basic layouting of utilities.</td>
    </tr>
</table>
</details>

---
## Contribute
You can contribute in the following ways:
- Fork a starter and localize it to the commercial standards of your area.
- Use an existing starter to create full home models.
- Review existing models, opening issues, compile material lists, etc.
- Modify or modularize existing models.

All contributions are accepted through pull-requests.
