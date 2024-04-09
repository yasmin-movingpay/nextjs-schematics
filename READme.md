# Nextjs Schematics

Esse script foi desenvolvido para facilitar a criação de componentes em projetos Nextjs.

Foi inspirado no Angular Schematics, que é uma ferramenta que facilita a criação de componentes, diretivas, serviços, etc.

## Opções

- `--props` Esta opção permite que você especifique as propriedades do componente. As propriedades devem ser separadas por ponto e vírgula. 

- `--view` Se esta opção for passada, "View" será adicionado ao final do nome do componente. 

## Exemplos

- Para criar um componente sem propriedades:

```bash
npm run g:c -- /caminho/para/o/diretorio
```

- Para criar um componente com propriedades:

```bash
npm run g:c -- /caminho/para/o/diretorio --props "prop1: string; prop2: number"
```

- Para criar um componente "View":

```bash
npm run g:c -- /caminho/para/o/diretorio --view
```

- Para criar um componente "View" com propriedades:

```bash
npm run g:c -- /caminho/para/o/diretorio --view --props "prop1: string; prop2: number"
```