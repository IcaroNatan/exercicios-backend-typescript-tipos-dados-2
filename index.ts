const fs = require("fs");

const leituraArquivo = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const escreverArquivo = (conteudo: any): void => {
  fs.writeFileSync("./bd.json", JSON.stringify(conteudo));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

const cadastrarUsuario = (novoUsuario: Usuario): Usuario => {
  const bd = leituraArquivo() as Usuario[];
  bd.push(novoUsuario);
  escreverArquivo(bd);
  return novoUsuario;
};

const listarUsuarios = (profissao?: string): Usuario[] => {
  const bd = leituraArquivo() as Usuario[];

  if (profissao) {
    const filtro = bd.filter((usuario) => {
      return usuario.profissao === profissao;
    });

    return filtro;
  }

  return bd;
};

const detalharUsuario = (cpf: string): Usuario => {
  const usuarios = leituraArquivo() as Usuario[];
  const usuario = usuarios.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return usuario;
};

const atualizarUsuario = (cpf: string, info: Usuario): Usuario => {
  const usuarios = leituraArquivo() as Usuario[];
  const usuario = usuarios.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  Object.assign(usuario, info);

  escreverArquivo(usuarios);

  return info;
};

const excluirUsuario = (cpf: string) => {
  const usuarios = leituraArquivo() as Usuario[];
  const usuario = usuarios.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }
  const exclusao = usuarios.filter((usuario) => {
    return usuario.cpf !== cpf;
  });

  escreverArquivo(exclusao);

  return usuario;
};
