

  

![Wiz solucoes](https://syz.wizsolucoes.com.br/assets/header/img/logowiz.svg)

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

  


# :sparkles: Wiz PowerBi
Wiz powerBi é um componente para embedar os relatórios do powerBi no seu projeto. Usamos Stencil para que possa ser usado com a maioria dos *frameworks* (React, vue e angular).

## Como usar 
🚧 Em andamento...


### Componente html
```html
  <wiz-powerbi
	embed-url=""
	id-pbi=""
	token=""
 >
</wiz-powerbi>
```

Para testar o componente você pode usar esse o link abaixo e pegar os principais parâmetros para teste.

[https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html](https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html)

 - Embed Token
 - Embed URL
 - Report ID

  
  
## :page_facing_up: Parâmetros

É esperado que o servidor retorne os seguintes parâmetros **embed-url, token e id**

| Parâmetro			| Obrigatório | tipagem | Default | Observação
|-------------------|-------------|----------|------|---|
| id-pbi    		| Sim	| string	| null	| ID do relatório  que você deseja incorporar|
| embed-url 		| Sim	| string	| null	| incorpora URL do relatório|
| token     		| Sim	| string	| null 	| |
| filters   		| Não	| Object	| null 	| [Link filtros](https://github.com/Microsoft/PowerBI-JavaScript/wiki/Filters)
| token-type		| Não 	| Number 	| 0 	| |
| type				| Não 	| string	| report||
|show-filter-bar	| Não	| boolean	| false | Mostrar barra lateral de filtro|
| show-menu-button 	| Não	| boolean	| true 	| Mostrar Menu no rodapé do relatório|
| max-mobile-size 	| Não 	| Number	| 800	 | Carregar em modo mobile |


Exemplo de aplicação de filtros 

```js
const filter = [{
	$schema:  "http://powerbi.com/product/schema#basic",
	target: {
		table:  "TABLE_EXAMPLE",
		column:  "Unidade"
	},
	operator:  "eq",
	values: ['212'],
	filterType:  1, // pbi.models.FilterType.BasicFilter,
	requireSingleSelection:  true  // Limits selection of values to one.
}]
```
  ```html
  <wiz-powerbi
	embed-url="..."
	id-pbi="..."
	token="..."
	filters="filters"
	max-mobile-size="768"
	show-filter-bar="false"
	show-menu-button="false"
	
 >
</wiz-powerbi>
```



## :globe_with_meridians: Links importantes
 - [Exemplo Powerbi Demo da Microsoft](https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html)
 - [Pacote  NPM usado Powerbi-client](https://www.npmjs.com/package/powerbi-client)


Projeto fase beta, ajude contribuindo nesse projeto para melhorar! :ok_hand:
