import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { LeadPayload } from '@/types/lead';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0A0F1F',
    color: '#F5F7FA',
    fontSize: 12,
    padding: 40,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    border: '1 solid #1A2B4C'
  },
  heading: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 700
  },
  subtitle: {
    fontSize: 12,
    color: '#8EA2C6',
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  badge: {
    display: 'inline-block',
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#1A2B4C',
    marginRight: 6,
    marginBottom: 6
  }
});

interface PDFBriefingProps extends LeadPayload {
  id: string;
  created_at: string;
}

export function PDFBriefing({ id, created_at, ...lead }: PDFBriefingProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.subtitle}>ForgeIA Studio</Text>
          <Text style={styles.heading}>Resumo do Briefing</Text>
          <Text>ID: {id}</Text>
          <Text>Data: {new Date(created_at).toLocaleString('pt-BR')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Serviços</Text>
          <Text>{lead.services.join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Objetivos do Negócio</Text>
          <Text>{lead.goals}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Funcionalidades Desejadas</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {lead.features.map((feature) => (
              <Text key={feature} style={styles.badge}>
                {feature}
              </Text>
            ))}
          </View>
          <Text style={{ marginTop: 8 }}>{lead.scope_notes}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Prazos & Investimento</Text>
          <Text>Janela de entrega: {lead.timeline}</Text>
          <Text>Faixa de investimento: {lead.budget_range}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Contato</Text>
          <Text>Nome: {lead.name}</Text>
          <Text>Empresa: {lead.company}</Text>
          <Text>E-mail: {lead.email}</Text>
          <Text>Telefone: {lead.phone}</Text>
          <Text>Localização: {lead.location}</Text>
          <Text>Consentimento: {lead.consent ? 'Sim' : 'Não'}</Text>
        </View>
      </Page>
    </Document>
  );
}
